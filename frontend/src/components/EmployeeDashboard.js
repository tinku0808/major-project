// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const EmployeeDashboard = () => {
//     const [learningMaterials, setLearningMaterials] = useState([]);
//     const [completedQuizzes, setCompletedQuizzes] = useState([]);
//     const [scores, setScores] = useState([]);
//     const [activeTab, setActiveTab] = useState("learning");
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

//     // Fetch employee's completed quizzes
//     useEffect(() => {
//         const fetchCompletedQuizzes = async () => {
//             const employeeId = localStorage.getItem("employeeId");
//             const token = localStorage.getItem("token");

//             try {
//                 const response = await axios.get(`http://localhost:5000/api/employee/scores/employee/${employeeId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setCompletedQuizzes(response.data);
//             } catch (error) {
//                 console.error("Error fetching completed quizzes:", error);
//             }
//         };

//         fetchCompletedQuizzes();
//     }, []);

//     // Fetch employee's quiz scores and time spent
//     useEffect(() => {
//         const fetchScores = async () => {
//             const employeeId = localStorage.getItem("employeeId");
//             const token = localStorage.getItem("token");

//             try {
//                 const response = await axios.get(`http://localhost:5000/api/employee/scores/${employeeId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setScores(response.data);
//             } catch (error) {
//                 console.error("Error fetching scores:", error);
//             }
//         };

//         fetchScores();
//     }, []);

//     // Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     };

//     // Handle material click
//     const handleMaterialClick = (materialId) => {
//         navigate(`/employee/material/${materialId}`);
//     };

//     return (
//         <div className="container">
//             <h2>Employee Dashboard</h2>
//             <p>Welcome to your dashboard!</p>
//             <button className="btn btn-danger mt-3" onClick={handleLogout}>
//                 Logout
//             </button>

//             {/* Navbar */}
//             <nav className="navbar navbar-expand-lg navbar-light bg-light mt-4">
//                 <span className="navbar-brand">Dashboard</span>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className={`nav-item ${activeTab === "learning" ? "active" : ""}`}>
//                             <button
//                                 className="btn nav-link"
//                                 onClick={() => setActiveTab("learning")}
//                             >
//                                 Available Learning Materials
//                             </button>
//                         </li>
//                         <li className={`nav-item ${activeTab === "engagement" ? "active" : ""}`}>
//                             <button
//                                 className="btn nav-link"
//                                 onClick={() => setActiveTab("engagement")}
//                             >
//                                 Engagement
//                             </button>
//                         </li>
//                         <li className="nav-item">
//                             <button className="btn nav-link" onClick={() => navigate("/feedback")}>
//                                 Feedback
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>

//             {/* Conditional rendering based on active tab */}
//             {activeTab === "learning" && (
//                 <section className="mt-4">
//                     <h3>Available Learning Materials</h3>
//                     <ul className="list-group">
//                         {learningMaterials.map((material) => (
//                             <li
//                                 key={material._id}
//                                 className="list-group-item"
//                                 onClick={() => handleMaterialClick(material._id)}
//                             >
//                                 {material.title}
//                             </li>
//                         ))}
//                     </ul>

//                     {/* Completed Quizzes Table */}
//                     <section className="mt-4">
//                         <h4>Completed Learning Materials</h4>
//                         {completedQuizzes.length > 0 ? (
//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
                                        
//                                         <th>Title</th>
//                                         <th>Status</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {completedQuizzes
//                                         .filter((quiz) => quiz.completed) // Only show completed quizzes
//                                         .map((quiz, index) => (
//                                             <tr key={index}>
//                                                 {/* <td>{quiz.quizId}</td> */}
//                                                 <td>{quiz.title}</td>
//                                                 <td>Completed</td>
//                                             </tr>
//                                         ))}
//                                 </tbody>
//                             </table>
//                         ) : (
//                             <p>No completed quizzes available.</p>
//                         )}
//                     </section>
//                 </section>
//             )}

//             {activeTab === "engagement" && (
//                 <section className="mt-4">
//                     <h3>Engagement</h3>
//                     {scores.length > 0 ? (
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Learning Material</th>
//                                     <th>Score</th>
//                                     <th>Time Spent (seconds)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {scores.map((score, index) => (
//                                     <tr key={index}>
//                                         <td>{score.learningMaterialTitle}</td>
//                                         <td>{score.score}</td>
//                                         <td>{score.timeSpent}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No scores available yet.</p>
//                     )}
//                 </section>
//             )}
//         </div>
//     );
// };

// export default EmployeeDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";

const EmployeeDashboard = () => {
    const [learningMaterials, setLearningMaterials] = useState([]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [scores, setScores] = useState([]);
    const [employeeName, setEmployeeName] = useState(""); // State for storing employee's name
    const [profilePic] = useState("https://static.vecteezy.com/system/resources/previews/026/829/465/non_2x/beautiful-girl-with-autumn-leaves-photo.jpg"); // Set default profile picture
    const [activeTab, setActiveTab] = useState("learning");
    const navigate = useNavigate();

    const employeeId = localStorage.getItem("employeeId"); // Get employeeId from localStorage

    // Fetch employee's details (name, profile picture, etc.)
    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployeeName(response.data.name);
                // Removed profilePic fetching, now using hardcoded value
            } catch (error) {
                console.error("Error fetching employee details:", error);
            }
        };
        fetchEmployeeDetails();
    }, [employeeId]);

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

    useEffect(() => {
        const fetchCompletedQuizzes = async () => {
            const token = localStorage.getItem("token");
    
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/scores/employee/${employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                // Check if there's data before setting completedQuizzes
                if (response.data && response.data.length > 0) {
                    setCompletedQuizzes(response.data);
                } else {
                    setCompletedQuizzes([]); // Set an empty array if no quizzes have been completed
                }
            } catch (error) {
                // Check if error is due to no quizzes
                if (error.response && error.response.status === 404) {
                    console.warn("No completed quizzes found for this employee.");
                    setCompletedQuizzes([]); // Set empty array if no quizzes found
                } else {
                    console.error("Error fetching completed quizzes:", error);
                }
            }
        };
    
        fetchCompletedQuizzes();
    }, [employeeId]);
    
    // Fetch employee's quiz scores and time spent
    useEffect(() => {
        const fetchScores = async () => {
            const token = localStorage.getItem("token");
    
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/scores/${employeeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                // Check if there's data before setting scores
                if (response.data && response.data.length > 0) {
                    setScores(response.data);
                } else {
                    setScores([]); // Set an empty array if no scores exist
                }
            } catch (error) {
                // Check if error is due to no scores found
                if (error.response && error.response.status === 404) {
                    console.warn("No scores found for this employee.");
                    setScores([]); // Set empty array if no scores found
                } else {
                    console.error("Error fetching scores:", error);
                }
            }
        };
    
        fetchScores();
    }, [employeeId]);
    
    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Handle material click
    const handleMaterialClick = (materialId) => {
        navigate(`/employee/material/${materialId}`);
    };

    return (
        <div className="container">
            <div className="profile-container text-center mt-3">
                {/* Circular Profile Picture */}
                <div className="profile-pic-wrapper">
                    <img
                        src={profilePic} // Now using hardcoded profile picture
                        alt="Profile"
                        className="profile-pic"
                    />
                </div>
                {/* Welcome message */}
                <h4>Welcome, {employeeName}!</h4>

                {/* Logout Button */}
                <button className="btn btn-danger mt-2" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mt-4">
                {/* <span className="navbar-brand">Dashboard</span> */}
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
                        <li className="nav-item">
                            <button className="btn nav-link" onClick={() => navigate("/feedback")}>
                                Feedback
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
                            className="list-group-item "
                        >
                            <span className="d-flex align-items-center justify-content-start">{material.title}</span>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleMaterialClick(material._id)}
                            >
                                View Material
                            </button>
                        </li>
                        ))}
                    </ul>

                    {/* Completed Quizzes Table */}
                    <section className="mt-4">
                        <h4>Completed Learning Materials</h4>
                        {completedQuizzes.length > 0 ? (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completedQuizzes
                                        .filter((quiz) => quiz.completed) // Only show completed quizzes
                                        .map((quiz, index) => (
                                            <tr key={index}>
                                                <td>{quiz.title}</td>
                                                <td>Completed</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No completed quizzes available.</p>
                        )}
                    </section>
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
                                    <th>Time Spent (seconds)</th>
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

