// controllers/quizController.js
const mongoose = require('mongoose');

const Quiz = require("../models/Quiz");
const LearningMaterial = require("../models/LearningMaterial");
const Score = require("../models/Score");

// Create Quiz
exports.createQuiz = async (req, res) => {
    const { title, questions } = req.body;
    const { learningMaterialId } = req.params;

    try {
        const learningMaterial = await LearningMaterial.findById(learningMaterialId);
        if (!learningMaterial) {
            return res.status(404).json({ msg: "Learning material not found" });
        }

        const newQuiz = new Quiz({
            title,
            questions,
            learningMaterial: learningMaterialId,
        });

        await newQuiz.save();
        res.status(201).json({ msg: "Quiz created successfully", quiz: newQuiz });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
// Fetch Quiz by ID
exports.getQuizByLearningMaterialId = async (req, res) => {
    const { learningMaterialId } = req.params;
    console.log("Learning Material ID:", learningMaterialId); 
    try {
        // Find the quiz that is associated with the given learning material ID
        const quiz = await Quiz.findOne({ learningMaterial: learningMaterialId });

        if (!quiz) {
            return res.status(404).json({ msg: "Quiz not found for this learning material" });
        }
        // Return the quiz ID
        const quizid = quiz._id.toString();
        res.json({ "quizId": quizid });
    } catch (err) {
        console.error("error in get quiz by learning material", err);
        res.status(500).json({ msg: "Server error" });
    }
};
// Submit quiz answers and allocate scores
exports.submitQuiz = async (req, res) => {
    const { employeeId, quizId, answers, totalTimeSpent } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        let score = 0;

        quiz.questions.forEach((question, index) => {
            const correctOption = question.options.find(option => option.isCorrect); // Find the correct option
            if (correctOption && correctOption.optionText === answers[index]) {
                score++; // Increment score if the answer matches the correct option
            }
        });

        // Save score and timeSpent to the Scores model
        const newScore = new Score({
            employeeId,
            quizId,
            score: parseInt(score),
            timeSpent: totalTimeSpent, // Save time spent
            date: new Date(),
        });

        await newScore.save();

        res.status(200).json({ score });
    } catch (error) {
        res.status(500).json({ message: "Error submitting quiz", error });
    }
};


exports.getQuestionsByQuizId = async (req, res) => {
    const { quizId } = req.params;
    console.log(quizId)

    try {
        const quiz = await Quiz.findById(quizId).populate('questions'); // Assuming questions are populated

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Send the questions back in response
        res.status(200).json({ questions: quiz.questions });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Server error" });
    }
};
