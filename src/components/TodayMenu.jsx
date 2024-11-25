import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import './TodayMenu.css';

const TodayMenu = () => {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist(); // Use context for wishlist management
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state in case the API fails

  useEffect(() => {
    // Fetch today's menu recipes from the backend
    axios.get('http://localhost:5000/api/recipe?category=todays')
      .then(response => {
        setMenuItems(response.data.data); // Assuming 'data' field holds recipe data
      })
      .catch(error => {
        console.error('Error fetching today’s menu:', error);
        setError('Failed to load today’s menu. Please try again.');
      })
      .finally(() => {
        setLoading(false); // Stop loading after fetching data
      });
  }, []);

  // Check if a recipe is in the wishlist
  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  // Handle wishlist toggle
  const toggleWishlist = (item) => {
    if (isInWishlist(item._id)) {
      removeFromWishlist(item._id); // Remove from wishlist if already added
    } else {
      addToWishlist({ id: item._id, name: item.RecipeName, image: item.Images }); // Add to wishlist
    }
  };

  return (
    <div className="container1">
      <div className="n1">
        <h1>Today's Menu</h1>
      </div>

      {/* Display loading or error message if necessary */}
      {loading ? (
        <p className="loading-message">Loading today’s menu, please wait...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="menu">
          {menuItems.length === 0 ? (
            <p>No items available for today’s menu.</p>
          ) : (
            menuItems.map((item) => (
              <div key={item._id} className="menu-item">
                {/* Make main content of card clickable by wrapping in Link */}
                <Link to={`/recipe/${item._id}`} className="card-link">
                  {/* Recipe Image */}
                  <img src={item.Images} alt={item.RecipeName} className="menu-item-img" />
                  {/* Recipe Title and Description */}
                  <h2>{item.RecipeName}</h2>
                  <p>{item.Description}</p> {/* Assuming 'Description' is the correct field */}
                </Link>

                {/* Wishlist heart icon (inside menu-item) */}
                <div
                  className={`wishlist-icon ${isInWishlist(item._id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents Link click
                    toggleWishlist(item);
                  }}
                >
                  <i className={`bi ${isInWishlist(item._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </div>
                
                {/* Link to view the recipe details */}
                <Link to={`/recipe/${item._id}`} className="today-menu-view-button">View Recipe</Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TodayMenu;
