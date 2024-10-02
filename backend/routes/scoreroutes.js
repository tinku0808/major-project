const express = require("express");
const router = express.Router();
const Score = require("../models/Score"); // Assuming you have a Score model
const Quiz = require("../models/Quiz"); // Ensure you're using the Quiz model

// Fetch scores for a specific employee
router.get("/scores/:employeeId", async (req, res) => {
    const { employeeId } = req.params;

    try {
        // Find the scores for the employee and populate the related quiz and learning material
        const scores = await Score.find({ employeeId }).populate({
            path: "quizId",
            populate: { path: "learningMaterial", select: "title" }, // Populate learning material title
        });

        if (!scores.length) {
            return res.status(404).json({ message: "No scores found for this employee" });
        }

        // Format response
        const result = scores.map((score) => ({
            learningMaterialTitle: score.quizId.learningMaterial.title, // Fetch the learning material title
            score: score.score,
            timeSpent: score.timeSpent,
        }));

        res.json(result);
    } catch (error) {
        console.error("Error fetching scores:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
