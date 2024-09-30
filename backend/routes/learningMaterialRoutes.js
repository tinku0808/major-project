const express = require("express");
const router = express.Router();
const { createLearningMaterial } = require("../controllers/learningMaterialController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware"); // Middleware to verify token

// Route to create learning material
router.post("/create-learning-material", verifyToken, isAdmin, createLearningMaterial);

module.exports = router;
