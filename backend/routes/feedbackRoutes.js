// routes/feedbackRoutes.js

const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// POST route to create feedback
router.post("/", feedbackController.createFeedback);

// GET route to fetch all feedback forms
router.get("/", feedbackController.getAllFeedback);

// GET route to fetch feedback for a particular employee
router.get("/:employeeId", feedbackController.getFeedbackByEmployeeId);

// GET route to fetch feedback details
router.get("/details/:feedbackId", feedbackController.getFeedbackDetails);

module.exports = router;
