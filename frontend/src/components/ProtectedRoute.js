import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // If token exists, allow access to the route, otherwise redirect to login
    return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;


