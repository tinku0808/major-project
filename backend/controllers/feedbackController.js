const Feedback = require("../models/Feedback");
const User = require("../models/User");

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

// Get Feedback Details

// Get Feedback Details
// Get Feedback Details
exports.getFeedbackDetails = async (req, res) => {
    try {
      // Fetch the feedback document by its ID
      const feedback = await Feedback.findOne(req.params._id);
  
      // Check if feedback exists
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
  
      // Fetch the user using employeeId as a Number
      const user = await User.find({ employeeId: feedback._id.employeeId }); // This retrieves the user based on employeeId
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return feedback and user information
      res.status(200).json({ feedback, user });
    } catch (error) {
      console.error("Error fetching feedback details:", error);
      res.status(500).json({ message: "Error fetching feedback details", error: error.message });
    }
  };
  