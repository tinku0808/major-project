// controllers/feedbackController.js

const Feedback = require("../models/Feedback");

// Create Feedback
exports.createFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: "Feedback created successfully", feedback });
    } catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({ message: "Error creating feedback", error: error.message });
    }
};

// Get All Feedback
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Error fetching feedback", error: error.message });
    }
};

// Get Feedback by Employee ID
exports.getFeedbackByEmployeeId = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ employeeId: req.params.employeeId });
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Error fetching feedback", error: error.message });
    }
};
