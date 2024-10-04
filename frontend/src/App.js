import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import CreateLearningMaterial from "./components/CreateLearningMaterial"; // New component for creating learning materials
import ProtectedRoute from "./components/ProtectedRoute";
import QuizPage from "./components/QuizPage";
import MaterialContent from "./components/MaterialContent";
import TestPage from "./components/TestPage";
import FeedbackForm from "./components/FeedbackForm";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
                <Route
                    path="/employee/material/:id"
                    element={
                        <ProtectedRoute>
                            <MaterialContent />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/test/:quizId"
                    element={
                        <ProtectedRoute>
                            <TestPage />
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
                {/* Protected Route for Creating Learning Material */}
                <Route
                    path="/admin-dashboard/quiz/create/:learningMaterialId"
                    element={
                        <ProtectedRoute>
                            <QuizPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/feedback"
                    element={
                        <ProtectedRoute>
                            <FeedbackForm />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            
        </Router>
    );
};

export default App;
