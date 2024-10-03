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
        console.log("Fetched Scores: ", scores);

        // Format response
        const result = scores.map((score) => ({
            learningMaterialTitle: score.quizId ? score.quizId.learningMaterial?.title : "N/A", // Handle missing quizId or learningMaterial
            score: score.score,
            timeSpent: score.timeSpent,
        }));
        

        // Log formatted response for debugging
        console.log("Formatted Result: ", result);

        res.json(result);
    } catch (error) {
        console.error("Error fetching scores:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/scores", async (req, res) => {
    try {
        // Find all scores and populate related quiz and learning material
        const scores = await Score.find().populate({
            path: "quizId",
            populate: { path: "learningMaterial", select: "title" }, // Populate learning material title
        });

        if (!scores.length) {
            return res.status(404).json({ message: "No scores found" });
        }
       
        // Get all distinct employeeIds from the scores
        const employeeIds = [...new Set(scores.map((score) => score.employeeId))];

        // Fetch employee details (names) for the employeeIds
        const employees = await User.find({ employeeId: { $in: employeeIds } }, "employeeId name");

        // Map employeeId to employeeName for easy lookup
        const employeeMap = employees.reduce((map, employee) => {
            map[employee.employeeId] = employee.name;
            return map;
        }, {});

        // Format the response
        const result = scores.map((score) => ({
            employeeName: employeeMap[score.employeeId] || "N/A", // Fetch employee name or use "N/A" if not found
            learningMaterialTitle: score.quizId.learningMaterial?.title || "N/A", // Handle missing quizId or learningMaterial
            score: score.score,
            timeSpent: score.timeSpent,
        }));

        res.json(result);
    } catch (error) {
        console.error("Error fetching all employee scores:", error);
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




module.exports = router;
