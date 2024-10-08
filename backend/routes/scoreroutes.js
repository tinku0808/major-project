const express = require("express");
const router = express.Router();
const Score = require("../models/Score"); // Assuming you have a Score model
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const LearningMaterial = require('../models/LearningMaterial');  // Ensure you're using the Quiz model

// Fetch scores for a specific employee
router.get("/scores/:employeeId", async (req, res) => {
    const { employeeId } = req.params;
    

    try {
        // Fetch scores and populate related quiz and learning material
        const scores = await Score.find({ employeeId }).populate({
            path: "quizId",
            populate: { path: "learningMaterial", select: "title" }, // Populating learning material title
        });

        if (!scores.length) {
            return res.status(404).json({ message: "No scores found for this employee" });
        }

        // Log fetched scores for debugging
        // console.log("Fetched Scores: ", scores);

        // Format response
        const result = scores.map((score) => ({
            learningMaterialTitle: score.quizId ? score.quizId.learningMaterial?.title : "N/A", // Handle missing quizId or learningMaterial
            score: score.score,
            timeSpent: score.timeSpent,
        }));
        

        // Log formatted response for debugging
        // console.log("Formatted Result: ", result);

        res.json(result);
    } catch (error) {
        console.error("Error fetching scores:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/buddhu/scores", async (req, res) => {
    try {
        // Step 1: Fetch all scores and populate related quiz and learning material
        const scores = await Score.find().populate({
            path: "quizId",
            populate: { path: "learningMaterial", select: "title" }, // Populating learning material title
        });

        if (!scores.length) {
            return res.status(404).json({ message: "No scores found" });
        }

        // Step 2: Extract all unique employeeIds from the scores and ensure they are numbers
        const employeeIds = [...new Set(scores.map(score => Number(score.employeeId)))];

        // Step 3: Fetch employee details (names) for the extracted employeeIds
        const employees = await User.find({ employeeId: { $in: employeeIds } }, "employeeId name");

        // Step 4: Create a map of employeeId to employee name for easy lookup
        const employeeMap = employees.reduce((map, employee) => {
            map[employee.employeeId] = employee.name;
            return map;
        }, {});

        // Step 5: Format the response by mapping over the scores
        const result = scores.map((score) => ({
            employeeName: employeeMap[Number(score.employeeId)] || "N/A", // Fetch employee name or use "N/A" if not found
            learningMaterialTitle: score.quizId?.learningMaterial?.title || "N/A", // Handle missing quizId or learningMaterial
            score: score.score,
            timeSpent: score.timeSpent,
        }));

        // Return the formatted response
        res.json(result);
    } catch (error) {
        console.error("Error fetching scores:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get('/scores/employee/:id', async (req, res) => {
    const employeeId = req.params.id;

    try {
        // Find scores associated with the given employeeId
        const scores = await Score.find({ employeeId }).select('employeeId quizId completed');

        // Check if any scores were found
        if (scores.length === 0) {
            return res.status(404).json({ message: 'No scores found for this employee' });
        }

        // Fetch quizzes based on quizIds from scores
        const quizIds = scores.map(score => score.quizId);
        const quizzes = await Quiz.find({ _id: { $in: quizIds } }).select('learningMaterial'); // Use 'learningMaterial' field

        // Create a map to associate quizId with learningMaterial
        const quizToMaterialMap = {};
        quizzes.forEach((quiz) => {
            quizToMaterialMap[quiz._id] = quiz.learningMaterial; // Use the correct field name
        });

        // Fetch learning materials based on learningMaterialIds
        const learningMaterialIds = Object.values(quizToMaterialMap);
        const learningMaterials = await LearningMaterial.find({ _id: { $in: learningMaterialIds } }).select('title');

        // Create a map to associate learningMaterialId with title
        const materialTitleMap = {};
        learningMaterials.forEach((material) => {
            materialTitleMap[material._id] = material.title; // Use the correct field name
        });

        // Prepare final output
        const result = scores.map(score => ({
            employeeId: score.employeeId,
            quizId: score.quizId,
            completed: score.completed,
            learningMaterial: quizToMaterialMap[score.quizId], // Use 'learningMaterial' here
            title: materialTitleMap[quizToMaterialMap[score.quizId]] // Get title based on learningMaterial
        }));

        // Send the combined data as response
        res.json(result);
    } catch (error) {
        console.error("Error fetching scores:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch employee name, department, learning material title, score, and time spent
router.get("/khushi/detailed-scores", async (req, res) => {
    try {
        // Step 1: Fetch all scores
        const scores = await Score.find().populate({
            path: "quizId",
            populate: { path: "learningMaterial", select: "title" }, // Populating learning material title from Quiz
        });

        if (!scores.length) {
            return res.status(404).json({ message: "No scores found" });
        }

        // Step 2: Extract unique employeeIds from the scores
        const employeeIds = [...new Set(scores.map((score) => score.employeeId))];

        // Step 3: Fetch employee details (name and department) for the extracted employeeIds
        const employees = await User.find(
            { employeeId: { $in: employeeIds } },
            "employeeId name department"
        );

        // Step 4: Create a map of employeeId to employee details for easy lookup
        const employeeMap = employees.reduce((map, employee) => {
            map[employee.employeeId] = {
                name: employee.name,
                department: employee.department,
            };
            return map;
        }, {});

        // Step 5: Format the final response
        const result = scores.map((score) => {
            const employee = employeeMap[score.employeeId] || { name: "N/A", department: "N/A" };
            return {
                employeeName: employee.name,
                department: employee.department,
                learningMaterialTitle: score.quizId?.learningMaterial?.title || "N/A", // From LearningMaterial
                score: score.score,
                timeSpent: score.timeSpent,
            };
        });

        // Step 6: Send the formatted result as response
        res.json(result);
    } catch (error) {
        console.error("Error fetching detailed scores:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = router;
