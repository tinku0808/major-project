const express = require("express");
const router = express.Router();
const Score = require("../models/Score"); // Assuming you have a Score model
const Quiz = require("../models/Quiz"); // Ensure you're using the Quiz model

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


module.exports = router;
