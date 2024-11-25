import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './header.css';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Get user and logout function from context

    const toggleDropdown = () => {
        setShowDropdown((prevState) => !prevState);
    };

    const handleLogout = async () => {
        try {
            // Send request to backend to handle logout
            const response = await axios.post('/api/auth/logout'); // Adjust URL if needed
            if (response.status === 200) {
                logout(); // Clear local context state (user)
                navigate('/login'); // Redirect to login page after successful logout
            } else {
                console.error('Logout failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleSearch = async (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipe/search?query=${searchQuery}`);
                const searchResults = response.data.data;
                navigate('/search', { state: { results: searchResults, query: searchQuery } });
            } catch (error) {
                console.error('Error fetching search results:', error);
                navigate('/search', { state: { results: [], query: searchQuery } });
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="header d-flex justify-content-between align-items-center">
                <div className="logo">
                    <a href="#">
                        <img src="../public/images/logo1-removebg-preview.png" alt="Logo" className="logo-img" />
                    </a>
                </div>

                <div className="search-bar d-flex align-items-center">
                    <input
                        className="form-control search-input rounded-pill"
                        type="search"
                        placeholder="Search for recipes, ingredients, and more"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    <button className="btn btn-outline-secondary ms-2" onClick={handleSearch}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>

                <div className="custom-icons d-flex align-items-center">
                    <div className="icon-container">
                        <Link to="/wishlist" className="custom-wishlist-icon text-dark fs-3 me-4">
                            <i className="bi bi-suit-heart-fill"></i>
                        </Link>
                        <span className="icon-label">Wishlist</span>
                    </div>

                    <div className="icon-container position-relative">
                        <i
                            className="bi bi-person-circle profile-icon fs-3 text-dark me-4"
                            onClick={toggleDropdown}
                            style={{ cursor: 'pointer' }}
                        ></i>
                        <span className="icon-label">{user ? user.name : 'Profile'}</span> {/* Display username if logged in */}

                        {showDropdown && (
                            <div className="profile-dropdown-vertical">
                                {user ? (
                                    <>
                                        <button className="dropdown-item" onClick={handleLogout}>
                                            Log Out
                                        </button>
                                        <Link to="/add-recipe" className="dropdown-item">
                                            Add Recipe
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <button className="dropdown-item" onClick={() => navigate('/login')}>
                                            Log In
                                        </button>
                                        <button className="dropdown-item" onClick={() => navigate('/add-recipe')}>
                                            Add Recipe
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
