import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear the token
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="container">
            <h2>Employee Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            
            <button 
                className="btn btn-danger mt-3" 
                onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default EmployeeDashboard;

