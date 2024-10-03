// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const EmployeeDashboard = () => {
//     const [learningMaterials, setLearningMaterials] = useState([]);
//     const navigate = useNavigate();

//     // Fetch learning materials
//     useEffect(() => {
//         const fetchLearningMaterials = async () => {
//             const token = localStorage.getItem("token");
//             try {
//                 const response = await axios.get("http://localhost:5000/api/admin/learning-materials", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setLearningMaterials(response.data);
//             } catch (error) {
//                 console.error("Error fetching learning materials:", error);
//             }
//         };
//         fetchLearningMaterials();
//     }, []);

//     // Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/"); // Redirect to login page
//     };

//     // Handle material click
//     const handleMaterialClick = (materialId) => {
//         navigate(`/employee/material/${materialId}`); // Navigate to MaterialContent page
//     };

//     return (
//         <div className="container">
//             <h2>Employee Dashboard</h2>
//             <p>Welcome to your dashboard!</p>
//             <button className="btn btn-danger mt-3" onClick={handleLogout}>
//                 Logout
//             </button>

//             <nav className="mt-4">
//                 <h3>Available Learning Materials</h3>
//                 <ul className="list-group">
//                     {learningMaterials.map((material) => (
//                         <li
//                             key={material._id}
//                             className="list-group-item"
//                             onClick={() => handleMaterialClick(material._id)} // Pass the material ID
//                         >
//                             {material.title}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default EmployeeDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {
    const [learningMaterials, setLearningMaterials] = useState([]);
    const [scores, setScores] = useState([]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [activeTab, setActiveTab] = useState("learning");
    const navigate = useNavigate();

    // Fetch learning materials
    useEffect(() => {
        const fetchLearningMaterials = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:5000/api/admin/learning-materials", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLearningMaterials(response.data);
            } catch (error) {
                console.error("Error fetching learning materials:", error);
            }
        };
        fetchLearningMaterials();
    }, []);

    // Fetch employee's quiz scores
    useEffect(() => {
        const fetchScores = async () => {
            const employeeId = localStorage.getItem("employeeId");
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`http://localhost:5000/api/employee/scores/${employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setScores(response.data);
            } catch (error) {
                console.error("Error fetching scores:", error);
            }
        };

        fetchScores();
    }, []);

    // Fetch completed quizzes for the employee
    useEffect(() => {
        const fetchCompletedQuizzes = async () => {
            const employeeId = localStorage.getItem("employeeId");
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`http://localhost:5000/api/employee/scores/employee/${employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompletedQuizzes(response.data);
            } catch (error) {
                console.error("Error fetching completed quizzes:", error);
            }
        };

        fetchCompletedQuizzes();
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Handle material click
    const handleMaterialClick = (materialId) => {
        navigate(`/employee/material/${materialId}`);
    };

    // Function to check if the material is completed
    const isMaterialCompleted = (materialId) => {
        const completedScore = completedQuizzes.find((quiz) => quiz.quizId === materialId && quiz.completed);
        return !!completedScore;
    };

    return (
        <div className="container">
            <h2>Employee Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Logout
            </button>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mt-4">
                <span className="navbar-brand">Dashboard</span>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${activeTab === "learning" ? "active" : ""}`}>
                            <button
                                className="btn nav-link"
                                onClick={() => setActiveTab("learning")}
                            >
                                Available Learning Materials
                            </button>
                        </li>
                        <li className={`nav-item ${activeTab === "engagement" ? "active" : ""}`}>
                            <button
                                className="btn nav-link"
                                onClick={() => setActiveTab("engagement")}
                            >
                                Engagement
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Conditional rendering based on active tab */}
            {activeTab === "learning" && (
                <section className="mt-4">
                    <h3>Available Learning Materials</h3>
                    <ul className="list-group">
                        {learningMaterials.map((material) => (
                            <li
                                key={material._id}
                                className="list-group-item"
                                onClick={() => handleMaterialClick(material._id)}
                                style={{
                                    textDecoration: isMaterialCompleted(material._id) ? 'line-through' : 'none',
                                }}
                            >
                                {material.title}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {activeTab === "engagement" && (
                <section className="mt-4">
                    <h3>Engagement</h3>
                    {scores.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Learning Material</th>
                                    <th>Score</th>
                                    <th>Time Spent (minutes)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map((score, index) => (
                                    <tr key={index}>
                                        <td>{score.learningMaterialTitle}</td>
                                        <td>{score.score}</td>
                                        <td>{score.timeSpent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No scores available yet.</p>
                    )}
                </section>
            )}
        </div>
    );
};

export default EmployeeDashboard;
