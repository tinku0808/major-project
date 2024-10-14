// models/Quiz.js
const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    optionText: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [optionSchema],
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [questionSchema],
    learningMaterial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LearningMaterial",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", quizSchema);
