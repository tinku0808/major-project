// controllers/quizController.js
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
    const { employeeId, quizId, answers } = req.body;

    try {
        console.log(employeeId, quizId, answers)
        const quiz = await Quiz.findById(quizId);
        console.log(quiz)
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        let score = 0;

        quiz.questions.forEach((question, index) => {
            question.options.forEach((optionText,index) => {
                if (optionText.optionText === answers[index]) {
                    score++;
                }
            })

        });
        try{
            console.log(score)
        // Save score to the Scores model
        const newScore = new Score({
            employeeId,
            quizId,
            score: parseInt(score),
            date: new Date(),
        });
        console.log(newScore)
        
        await newScore.save();
        }catch(error){
            console.log("Error saving score",error);
        }

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
// const Quiz = require("../models/Quiz");
// const LearningMaterial = require("../models/LearningMaterial");
// const Score = require("../models/Score"); // Assuming you have a Score model to track employee scores

// // Create Quiz (Admin only)
// // // Create Quiz
// exports.createQuiz = async (req, res) => {
//     const { title, questions } = req.body;
//     const { learningMaterialId } = req.params;

//     console.log(title, questions, learningMaterialId)

//     try {
//         const learningMaterial = await LearningMaterial.findById(learningMaterialId);
//         if (!learningMaterial) {
//             return res.status(404).json({ msg: "Learning material not found" });
//         }

//         const newQuiz = new Quiz({
//             title,
//             questions,
//             learningMaterial: learningMaterialId,
//         });

//         await newQuiz.save();
//         res.status(201).json({ msg: "Quiz created successfully", quiz: newQuiz });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// };
// // Get Quiz by ID (for employees to take the test)
// exports.getQuizById = async (req, res) => {
//     try {
//         const quiz = await Quiz.findById(req.params.quizId);
//         if (!quiz) {
//             return res.status(404).json({ msg: "Quiz not found" });
//         }
//         res.status(200).json(quiz);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// };

// // Submit Quiz (Employee answers submission and score calculation)
// exports.submitQuiz = async (req, res) => {
//     const { quizId, employeeId, answers } = req.body;

//     try {
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ msg: "Quiz not found" });
//         }

//         // Calculate score
//         let score = 0;
//         quiz.questions.forEach((question, index) => {
//             if (question.correctAnswer === answers[index]) {
//                 score += 1;
//             }
//         });

//         // Store score in Score model
//         const newScore = new Score({
//             employeeId,
//             quizId,
//             score,
//         });

//         await newScore.save();
//         res.status(200).json({ msg: "Quiz submitted successfully", score });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// };
