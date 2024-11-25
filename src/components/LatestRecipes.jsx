import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import './LatestRecipes.css';

const LatestRecipes = () => {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist(); // Use context for wishlist management
  const [likedItems, setLikedItems] = useState(new Set()); // Track liked items
  const [latestRecipes, setLatestRecipes] = useState([]); // State for recipes
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch latest recipes from the backend by category
    const fetchLatestRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipe', {
          params: { category: 'latest' } // Pass category as a query parameter
        });
        setLatestRecipes(response.data.data); // Assuming the response has a 'data' field with recipe data
      } catch (error) {
        console.error('Error fetching latest recipes:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLatestRecipes();
  }, []);

  // Check if a recipe is in the wishlist
  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  // Handle wishlist toggle
  const toggleWishlist = (item) => {
    const updatedLikedItems = new Set(likedItems); // Create a new Set to update liked items

    if (updatedLikedItems.has(item.id)) {
      updatedLikedItems.delete(item.id); // Remove from liked items if already liked
      removeFromWishlist(item.id); // Remove from wishlist
    } else {
      updatedLikedItems.add(item.id); // Add to liked items if not already liked
      addToWishlist({ id: item.id, name: item.title, image: item.img }); // Add to wishlist
    }

    setLikedItems(updatedLikedItems); // Update state with the new Set
  };

  return (
    <div className="latest-recipes">
      <h1>Latest Recipes</h1>
      <div className="recipes-container">
        {loading ? (
          <p>Loading recipes, please wait...</p> // Loading state message
        ) : (
          latestRecipes.length === 0 ? (
            <p>No latest recipes found!</p> // Message when no recipes are found
          ) : (
            latestRecipes.map((recipe) => (
              <div key={recipe._id} className="recipe-card">
                <Link to={`/recipe/${recipe._id}`} className="card-link">
                  <img src={recipe.Images} alt={recipe.RecipeName} /> {/* Assuming Images is the correct field */}
                  <h3>{recipe.RecipeName}</h3> {/* Assuming RecipeName is the correct field */}
                </Link>
                <Link to={`/recipe/${recipe._id}`} className="latest-view-recipe-button">View Recipe</Link> {/* Link to Recipe component */}
                <div
                  className={`wishlist-icon ${isInWishlist(recipe._id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents Link click
                    toggleWishlist(recipe);
                  }}
                >
                  <i className={`bi ${isInWishlist(recipe._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default LatestRecipes;
