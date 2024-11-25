import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './loginSignup.css'; // Updated styling for an attractive look
import { useAuth } from '../context/AuthContext'; 

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { login, logout, user } = useAuth(); 

    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to home if user is already logged in
        }
    }, [user, navigate]);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '' }); // Reset form data
        setError(''); // Clear error message
        setSuccessMessage(''); // Clear success message
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        // Validate email
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            if (isLogin) {
                // Login logic
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    setError(''); // Clear error
                    setSuccessMessage('Logged in successfully!'); // Set success message
                    alert('Login successful!'); // Alert user
                    const { token, user: userInfo } = data; // Extract token and user info
                    login(userInfo); // Call login function from AuthContext, passing userInfo
                    localStorage.setItem('authToken', token); // Optionally store the token
                    navigate('/'); // Redirect to home
                } else {
                    setError(data.message || 'Login failed. Please try again.'); // Handle error
                }
            } else {
                // Signup logic
                if (!name) {
                    setError('Please enter your name.');
                    return;
                }

                const response = await fetch('http://localhost:5000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    setError(''); // Clear error
                    setSuccessMessage('Signed up successfully!'); // Set success message
                    alert('Signup successful!'); // Alert user
                } else {
                    setError(data.message || 'Signup failed. Please try again.'); // Handle error
                }
            }
        } catch (error) {
            console.error('Error during authentication:', error); // Log error
            setError('An error occurred. Please try again later.'); // Set error message
        }
    };

    const handleLogout = () => {
        logout(); // Call logout function from AuthContext
        navigate('/'); // Redirect to home after logout
    };

    return (
        <div className="login-signup-container">
            <div className="form-wrapper">
                {user ? (
                    <>
                        <h2>Welcome, {user.name}!</h2> {/* Show user's name if logged in */}
                        <button onClick={handleLogout} className="logout-btn">Logout</button> {/* Logout button */}
                        <button onClick={() => navigate('/add-recipe')} className="add-recipe-btn">Add Recipe</button> {/* Add Recipe button */}
                    </>
                ) : (
                    <>
                        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        required={!isLogin}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            {error && <p className="error-message">{error}</p>} {/* Show error message */}
                            {successMessage && <p className="success-message">{successMessage}</p>} {/* Show success message */}

                            <button type="submit" className="submit-btn">
                                {isLogin ? 'Login' : 'Sign Up'}
                            </button>
                        </form>

                        <p className="toggle-text">
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                            <span onClick={toggleForm} className="toggle-link">
                                {isLogin ? 'Sign up' : 'Login'}
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;
