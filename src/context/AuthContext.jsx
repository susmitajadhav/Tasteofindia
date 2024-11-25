import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);  // Store user info

    const login = (userInfo) => {
        setIsAuthenticated(true);
        setUser(userInfo);  // Set the user info
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);  // Clear user info
        localStorage.removeItem('authToken');  // Optionally remove token
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
