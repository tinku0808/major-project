import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const QuizPage = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    questions: [
      {
        questionText: "",
        options: [{ optionText: "", isCorrect: false }],
      },
    ],
  });

  const navigate = useNavigate();
  const { learningMaterialId } = useParams(); // Get learning material ID from URL

  // Handle input change for quiz title
  const handleTitleChange = (e) => {
    setQuizData({ ...quizData, title: e.target.value });
  };

  // Handle input change for questions
  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][e.target.name] = e.target.value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Handle input change for options
  const handleOptionChange = (qIndex, oIndex, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[oIndex][e.target.name] = e.target.value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Add new question
  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { questionText: "", options: [{ optionText: "", isCorrect: false }] },
      ],
    });
  };

  // Add new option to a question
  const addOption = (qIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options.push({ optionText: "", isCorrect: false });
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Delete a question
  const deleteQuestion = (qIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions.splice(qIndex, 1); // Remove the question at qIndex
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // Handle quiz submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized, please login.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/quiz/create-quiz/${learningMaterialId}`,
        quizData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      alert("Quiz created successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert("Failed to create quiz");
    }
  };

  // Go back to the previous page
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="container mt-5">
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quiz Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={quizData.title}
            onChange={handleTitleChange}
            required
          />
        </div>

        {quizData.questions.map((question, qIndex) => (
          <div key={qIndex} className="form-group mt-3">
            <label>Question {qIndex + 1}</label>
            <input
              type="text"
              name="questionText"
              className="form-control"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              required
            />
            <label>Options:</label>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="form-inline mt-2">
                <input
                  type="text"
                  name="optionText"
                  className="form-control"
                  value={option.optionText}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  required
                />
                <label className="ml-3">
                  <input
                    type="checkbox"
                    name="isCorrect"
                    checked={option.isCorrect}
                    onChange={() => {
                      const updatedQuestions = [...quizData.questions];
                      updatedQuestions[qIndex].options[oIndex].isCorrect =
                        !updatedQuestions[qIndex].options[oIndex].isCorrect;
                      setQuizData({ ...quizData, questions: updatedQuestions });
                    }}
                  />
                  Correct
                </label>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={() => addOption(qIndex)}
              style={{ marginRight: "25px" }}
            >
              Add Option
            </button>
            <div>
            <button
              type="button"
              className="btn btn-warning mt-2 ml-2"
              onClick={() => deleteQuestion(qIndex)}
            >
              Delete Question
            </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-success mt-3"
          onClick={addQuestion}
          style={{ marginRight: "10px" }}
        >
          Add Question
        </button>

        <button type="submit" className="btn btn-primary mt-3">
          Create Quiz
        </button>
        <div>
        <button
          type="button"
          className="btn btn-danger mt-3 ml-2"
          onClick={handleBack}
        >
          Back
        </button>
        </div>
      </form>
    </div>
  );
};

export default QuizPage;
