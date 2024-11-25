// src/components/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Adjust the path as necessary

const PublicRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    return !isAuthenticated ? element : <Navigate to="/" />;  // Redirect authenticated users to home
};

export default PublicRoute;
