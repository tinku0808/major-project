// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const MaterialContent = () => {
//     const { id } = useParams(); // Get the material ID from the URL
//     const [material, setMaterial] = useState(null);
//     const [quizId, setQuizId] = useState("");
//     const [timeSpent, setTimeSpent] = useState(0);
//     const navigate = useNavigate();

//     // Fetch the specific learning material by ID
//     useEffect(() => {
//         const fetchMaterialContent = async () => {
//             const token = localStorage.getItem("token");
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/admin/learning-material/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setMaterial(response.data);
//                 startTimer(); // Start the timer once the material is fetched
//             } catch (error) {
//                 console.error("Error fetching material content:", error);
//             }
//         };

//         fetchMaterialContent();
//     }, [id]);

//     // Start timer for time spent on learning material
//     const startTimer = () => {
//         const startTime = Date.now();
//         const timer = setInterval(() => {
//             setTimeSpent(Math.floor((Date.now() - startTime) / 1000)); // Time in seconds
//         }, 1000);

//         return () => clearInterval(timer); // Clear timer on unmount
//     };

//     // Make a function to fetch quiz id for the given material id

//     // Handle test button click
//     const handleTestClick = () => {
//         navigate(`/employee/test/${quizId}`); // Navigate to test page
//     };

//     // Handle completion
//     const handleCompletion = () => {
//         alert("Learning material completed!");
//         // You can implement further logic to update the completion status in the database
//     };

//     if (!material) {
//         return <p>Loading...</p>; // Show a loading message while fetching the material
//     }
//     console.log(material._id)

//     return (
//         <div className="container">
//             <h4>{material.title}</h4>
//             <p>{material.description}</p>
//             <h5>Content:</h5>
//             {material.modules.map((module, index) => (
//                 <div key={index}>
//                     <h6>{module.title}</h6>
//                     <p>{module.content}</p>
//                 </div>
//             ))}
//             <p>Time Spent: {timeSpent} seconds</p>
//             <button className="btn btn-primary" onClick={handleTestClick}>
//                 Take Test
//             </button>
//             <button className="btn btn-success" onClick={handleCompletion}>
//                 Mark as Completed
//             </button>
//         </div>
//     );
// };

// export default MaterialContent;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MaterialContent = () => {
    const { id } = useParams(); // Get the material ID from the URL
    const [material, setMaterial] = useState(null);
    const [quizId, setQuizId] = useState("");
    const [timeSpent, setTimeSpent] = useState(0);
    const navigate = useNavigate();

    // Fetch the specific learning material by ID
    useEffect(() => {
        const fetchMaterialContent = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`http://localhost:5000/api/admin/learning-material/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMaterial(response.data);
                startTimer(); // Start the timer once the material is fetched
                fetchQuizId(response.data._id); // Fetch quiz ID based on material ID
            } catch (error) {
                console.error("Error fetching material content:", error);
            }
        };

        fetchMaterialContent();
    }, [id]); // Only run when the material ID changes

    // Fetch the quiz ID for the given material ID
    const fetchQuizId = async (materialId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:5000/api/quiz/material/${materialId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setQuizId(response.data.quizId); // Set the quiz ID after fetching it
        } catch (error) {
            console.error("Error fetching quiz ID:", error);
        }
    };

    // Start timer for time spent on learning material
    const startTimer = () => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            setTimeSpent(Math.floor((Date.now() - startTime) / 1000)); // Time in seconds
        }, 1000);

        return () => clearInterval(timer); // Clear timer on unmount
    };

    // Handle test button click
    const handleTestClick = async () => {
        if (quizId) {
            navigate(`/employee/test/${quizId}?timeSpent=${timeSpent}`); // Pass timeSpent to TestPage via URL
        } else {
            alert("No quiz available for this material");
        }
    };

    // Handle completion
    const handleCompletion = () => {
        alert("Learning material completed!");
        // You can implement further logic to update the completion status in the database
    };

    if (!material) {
        return <p>Loading...</p>; // Show a loading message while fetching the material
    }

    return (
        <div className="container">
            <h4>{material.title}</h4>
            <p>{material.description}</p>
            <h5>Content:</h5>
            {material.modules.map((module, index) => (
                <div key={index}>
                    <h6>{module.title}</h6>
                    <p>{module.content}</p>
                </div>
            ))}
            <p>Time Spent: {timeSpent} seconds</p>
            <button className="btn btn-primary" onClick={handleTestClick}>
                Take Test
            </button>
            <button className="btn btn-success" onClick={handleCompletion}>
                Mark as Completed
            </button>
        </div>
    );
};

export default MaterialContent;


