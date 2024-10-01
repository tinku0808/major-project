// TestPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Quiz from "./Quiz"; // Import the Quiz component

const TestPage = () => {
    const { quizId } = useParams(); // Get the quiz ID from the URL
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch the quiz by ID
    useEffect(() => {
        const fetchQuiz = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`http://localhost:5000/api/quiz/${quizId}/questions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuiz(response.data);
                setAnswers(new Array(response.data.questions.length).fill("")); // Initialize answers
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]);

    // Handle answer change
    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    

    // Handle quiz submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeId = localStorage.getItem("employeeId"); // Use the actual employee ID

        try {
            const response = await axios.post("http://localhost:5000/api/quiz/submit-quiz", {
                employeeId,
                quizId,
                answers,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            alert(`Your score is: ${response.data.score}`);
            navigate("/employee/dashboard"); // Redirect back to the employee dashboard
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Failed to submit quiz. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quiz) {
        return <div>Quiz not found.</div>;
    }

    return (
        <div className="container">
            <h2>{quiz.title}</h2>
            <form onSubmit={handleSubmit}>
                <Quiz
                    questions={quiz.questions}
                    answers={answers}
                    handleAnswerChange={handleAnswerChange}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default TestPage;
