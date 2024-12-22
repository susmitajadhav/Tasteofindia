import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import './CuisineDetailPage.css'; // Reuse the CSS from CuisineDetailPage

const AllCuisinesPage = () => {
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist(); // Wishlist context

  // Fetch all recipes
  const fetchAllRecipes = async () => {
    try {
      const response = await axios.get('https://backend-testofindia.onrender.com/api/recipe'); // Fetch all recipes

      // Check if there are any recipes, set the state accordingly
      if (response.data && response.data.data) {
        setRecipes(response.data.data);
      } else {
        setRecipes([]); // Set empty if no recipes are returned
      }
      setLoading(false); // Stop loading
    } catch (error) {
      setError('Failed to load recipes. Please try again later.');
      setLoading(false);
    }
  };

  // Use effect to fetch data when component mounts
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  // Toggle wishlist (add or remove)
  const toggleWishlist = (recipe) => {
    const isInWishlist = wishlistItems.some(item => item.id === recipe._id);
    if (isInWishlist) {
      removeFromWishlist(recipe._id); // Remove from wishlist if already present
    } else {
      addToWishlist({ id: recipe._id, name: recipe['RecipeName'], image: recipe.Images }); // Add to wishlist
    }
  };

  // Check if a recipe is in the wishlist
  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  // Show loading spinner when data is still being fetched
  if (loading) return <div className="cuisine-loading">Loading...</div>;

  // Show error message if fetching fails
  if (error) return <div className="cuisine-error">{error}</div>;

  // Display message if no recipes are found
  if (recipes.length === 0) return <div className="cuisine-no-data">No recipes found.</div>;

  return (
    <div className="cuisine-detail-page">
      <h2 className="cuisine-title">All Cuisines</h2>
      <div className="cuisine-details">
        {recipes.map((recipe) => (
          <div key={recipe._id || recipe['RecipeName']} className="cuisine-recipe-card">
            {/* Entire card is now clickable */}
            <Link to={`/recipe/${recipe._id}`} className="cuisine-recipe-link">
              <div className="cuisine-recipe-content">
                <img 
                  src={recipe.Images ? recipe.Images : '/images/default-recipe.jpg'} 
                  alt={recipe['RecipeName']} 
                  className="cuisine-recipe-image"
                />
                <h5 className="cuisine-recipe-title">{recipe['RecipeName']}</h5>

                {/* View Recipe button */}
                <div className="view-recipe-button">
                  View Recipe
                </div>

                {/* Wishlist button */}
                <div
                  className={`wishlist-heart-icon1 ${isInWishlist(recipe._id) ? 'red' : ''}`}
                  onClick={(e) => { 
                    e.preventDefault(); // Prevent Link click when clicking wishlist icon
                    toggleWishlist(recipe);
                  }}
                >
                  ♥
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCuisinesPage;
