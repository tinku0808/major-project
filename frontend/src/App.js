import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import CreateLearningMaterial from "./components/CreateLearningMaterial"; // New component for creating learning materials
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                
                {/* Protected Admin Dashboard Route */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                
                {/* Protected Employee Dashboard Route */}
                <Route
                    path="/employee-dashboard"
                    element={
                        <ProtectedRoute>
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />
                
                {/* Protected Route for Creating Learning Material */}
                <Route
                    path="admin-dashboard/create-learning-material"
                    element={
                        <ProtectedRoute>
                            <CreateLearningMaterial />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
