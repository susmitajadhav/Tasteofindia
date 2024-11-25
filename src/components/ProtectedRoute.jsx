// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();  // Get the current location

    return isAuthenticated ? (
        element
    ) : (
        // Redirect to login page and save the current location in the state
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default ProtectedRoute;
