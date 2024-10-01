// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const EmployeeDashboard = () => {
//     const [learningMaterials, setLearningMaterials] = useState([]);
//     const [selectedMaterial, setSelectedMaterial] = useState(null);
//     const [timeSpent, setTimeSpent] = useState(0);
//     const navigate = useNavigate();

//     // Fetch learning materials
//     useEffect(() => {
//         const fetchLearningMaterials = async () => {
//             const token = localStorage.getItem("token");
//             const response = await axios.get("http://localhost:5000/api/admin/learning-materials", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setLearningMaterials(response.data);
//         };
//         fetchLearningMaterials();
//     }, []);

//     // Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/"); // Redirect to login page
//     };

//     // Handle material selection
//     const handleMaterialClick = (material) => {
//         setSelectedMaterial(material);
//         setTimeSpent(0); // Reset time spent
//         startTimer(); // Start tracking time
//     };

//     // Start timer for time spent on learning material
//     const startTimer = () => {
//         const startTime = Date.now();
//         const timer = setInterval(() => {
//             setTimeSpent(Math.floor((Date.now() - startTime) / 1000)); // Time in seconds
//         }, 1000);

//         // Clear timer when the component is unmounted
//         return () => clearInterval(timer);
//     };

//     // Handle test button click
//     const handleTestClick = () => {
//         // Implement test logic here
//         navigate(`/employee/test/${selectedMaterial._id}`); // Redirect to test page
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
//                             onClick={() => handleMaterialClick(material)}
//                         >
//                             {material.title}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>

//             {selectedMaterial && (
//                 <div className="mt-4">
//                     <h4>{selectedMaterial.title}</h4>
//                     <p>{selectedMaterial.description}</p>
//                     <h5>Content:</h5>
//                     {selectedMaterial.modules.map((module, index) => (
//                         <div key={index}>
//                             <h6>{module.title}</h6>
//                             <p>{module.content}</p>
//                         </div>
//                     ))}
//                     <p>Time Spent: {timeSpent} seconds</p>
//                     <button className="btn btn-primary" onClick={handleTestClick}>
//                         Take Test
//                     </button>
//                     <button
//                         className="btn btn-success"
//                         onClick={() => {
//                             // Mark as completed logic here
//                             alert("Learning material completed!");
//                         }}
//                     >
//                         Mark as Completed
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EmployeeDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeDashboard = () => {
    const [learningMaterials, setLearningMaterials] = useState([]);
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

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/"); // Redirect to login page
    };

    // Handle material click
    const handleMaterialClick = (materialId) => {
        navigate(`/employee/material/${materialId}`); // Navigate to MaterialContent page
    };

    return (
        <div className="container">
            <h2>Employee Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Logout
            </button>

            <nav className="mt-4">
                <h3>Available Learning Materials</h3>
                <ul className="list-group">
                    {learningMaterials.map((material) => (
                        <li
                            key={material._id}
                            className="list-group-item"
                            onClick={() => handleMaterialClick(material._id)} // Pass the material ID
                        >
                            {material.title}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default EmployeeDashboard;
