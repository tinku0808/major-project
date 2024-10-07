// routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const { createQuiz,getQuizByLearningMaterialId,submitQuiz,getQuestionsByQuizId} = require("../controllers/quizController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Route to create a quiz associated with a learning material
router.post("/create-quiz/:learningMaterialId", verifyToken,isAdmin, createQuiz);
router.get("/material/:learningMaterialId", getQuizByLearningMaterialId);
router.post("/submit-quiz", submitQuiz);
router.get('/:quizId/questions', getQuestionsByQuizId);

module.exports = router;

