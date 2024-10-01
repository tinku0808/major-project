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


// const express = require("express");
// const router = express.Router();
// const { createQuiz, getQuizById, submitQuiz } = require("../controllers/quizController");
// const { verifyToken, isAdmin } = require("../middleware/authMiddleware"); // Middleware to verify token and admin

// // Route to create a quiz (Admin only)
// router.post("/:learningMaterialId", verifyToken, isAdmin, createQuiz);

// // Route to get a quiz by its ID
// router.get("/:quizId", getQuizById);

// // Route to submit a quiz and calculate score
// router.post("/submit",  submitQuiz);

// module.exports = router;
