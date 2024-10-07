import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Quiz from "./Quiz"; // Ensure this path is correct

const TestPage = () => {
    const { quizId } = useParams(); // Get the quiz ID from the URL
    const location = useLocation(); // Use this to access the query params
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]); // Track answers
    const [loading, setLoading] = useState(true);
    const [startTime, setStartTime] = useState(null); // Track starting time for the test
    const [materialTimeSpent, setMaterialTimeSpent] = useState(0); // Time spent on material
    const navigate = useNavigate();

    // Fetch the quiz by ID and track time
    useEffect(() => {
        const fetchQuiz = async () => {
            const token = localStorage.getItem("token");

            // Extract `timeSpent` from the query parameters
            const queryParams = new URLSearchParams(location.search);
            const storedMaterialTime = queryParams.get("timeSpent");

            setMaterialTimeSpent(storedMaterialTime ? parseInt(storedMaterialTime) : 0); // Set material time

            try {
                const response = await axios.get(`http://localhost:5000/api/quiz/${quizId}/questions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuiz(response.data); // Set the quiz data
                setAnswers(new Array(response.data.questions.length).fill("")); // Initialize answers array
                setLoading(false);
                setStartTime(Date.now()); // Set start time when quiz is loaded
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId, location.search]); // Add location.search to dependencies

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
        const endTime = Date.now(); // Getting end time
        const totalTestTimeSpent = Math.floor((endTime - startTime) / 1000); // Time spent on test in seconds
        const totalTimeSpent = materialTimeSpent + totalTestTimeSpent; // Add time spent on material and test

        try {
            // Submit the quiz answers
            const response = await axios.post(
                "http://localhost:5000/api/quiz/submit-quiz",
                {
                    employeeId,
                    quizId,
                    answers,
                    totalTimeSpent, // Send total time spent (material + test) to the server
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Mark the learning material as completed
            await axios.post(
                "http://localhost:5000/api/material/complete-learning-material",
                {
                    employeeId,
                    materialId: quizId, // Use the quizId as the learning material ID
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Show score and time spent
            alert(`Your score is: ${response.data.score}\nTotal time spent: ${totalTimeSpent} seconds`);
            navigate("/employee-dashboard"); // Redirect back to the employee dashboard
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

