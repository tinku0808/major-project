const express = require("express");
const router = express.Router();
const { createLearningMaterial, getAllLearningMaterials,getLearningMaterialById} = require("../controllers/learningMaterialController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware"); // Middleware to verify token

// Route to create a learning material
router.post("/create-learning-material", verifyToken, isAdmin, createLearningMaterial);

// Route to get all learning materials
router.get("/learning-materials", getAllLearningMaterials);
router.get("/learning-material/:id",  getLearningMaterialById); // New route

module.exports = router;
