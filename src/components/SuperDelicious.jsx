import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import './SuperDelicious.css';

const SuperDelicious = () => {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist(); // Use context for wishlist management
  const [deliciousItems, setDeliciousItems] = useState([]); // State for delicious recipes
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch delicious recipes from the backend
    const fetchDeliciousRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipe', {
          params: { category: 'Delicious' } // Pass category as a query parameter
        });

        // Check if the response has the expected structure
        if (response.data && response.data.data) {
          setDeliciousItems(response.data.data); // Set delicious items if data is present
        } else {
          setError('No delicious recipes found'); // Handle case where data is not as expected
        }
      } catch (error) {
        console.error('Error fetching delicious recipes:', error);
        setError('Failed to fetch delicious recipes'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDeliciousRecipes();
  }, []);

  // Check if a recipe is in the wishlist
  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  // Handle wishlist toggle
  const toggleWishlist = (item) => {
    if (isInWishlist(item._id)) {
      removeFromWishlist(item._id); // Remove from wishlist if already liked
    } else {
      addToWishlist({ id: item._id, name: item.RecipeName, image: item.Images }); // Add to wishlist
    }
  };

  return (
    <div className="super-delicious">
      <h1>Super Delicious</h1>
      {loading ? ( // Show loading indicator while fetching
        <p>Loading delicious recipes, please wait...</p>
      ) : error ? ( // Show error message if there's an error
        <p>{error}</p>
      ) : (
        <div className="grid-container">
          {deliciousItems.length === 0 ? ( // Handle case when no recipes are found
            <p>No delicious recipes found!</p>
          ) : (
            deliciousItems.map((item) => (
              <div key={item._id} className="card">
                <Link to={`/recipe/${item._id}`} className="card-link">
                  <img src={item.Images} alt={item.RecipeName} /> {/* Assuming Images is the correct field */}
                  <div className="title">{item.RecipeName}</div> {/* Assuming RecipeName is the correct field */}
                  <div className="stars">
                    {Array(5).fill().map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                </Link>
                <Link to={`/recipe/${item._id}`} className="recipe-view-button">View Recipe</Link> {/* Link to Recipe component */}
                <div
                  className={`wishlist-icon ${isInWishlist(item._id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents Link click
                    toggleWishlist(item);
                  }}
                >
                  <i className={`bi ${isInWishlist(item._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SuperDelicious;
