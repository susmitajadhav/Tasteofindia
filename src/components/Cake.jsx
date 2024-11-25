import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import { Link } from 'react-router-dom';
import './DietDetailPage.css'; // Assuming you want to use the same styles

const Cake = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist(); // Use context for wishlist management

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/recipe?category=cake'); // Adjust API endpoint for cake recipes

        console.log("API Response for Cake Recipes:", response.data);

        // Check for data existence and correct structure
        if (response.data && response.data.data) {
          setRecipes(response.data.data);
          console.log("Recipes fetched:", response.data.data); // Debugging line
        } else {
          setRecipes([]);
          console.log("No recipes found.");
        }
      } catch (error) {
        console.error("Error fetching cake recipes:", error);
        setError(error.message || "An error occurred while fetching recipes."); // Improved error message handling
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Check if the recipe is in the wishlist
  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  // Add or remove the recipe from the wishlist
  const toggleWishlist = (recipe) => {
    if (isInWishlist(recipe._id)) {
      removeFromWishlist(recipe._id); // Remove if already in wishlist
    } else {
      addToWishlist({ id: recipe._id, name: recipe.RecipeName, image: recipe.Images }); // Add to wishlist
    }
  };

  // Loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the recipe list
  return (
    <div className="diet-detail-page">
      <h1 className="diet-detail-title">Cake Recipes</h1>
      <div className="diet-recipe-grid">
        {recipes.length === 0 ? (
          <p className="no-recipes-message">No recipes found</p>
        ) : (
          recipes.map(recipe => {
            const recipeName = recipe.RecipeName || "Unknown Recipe";
            console.log("Current recipe:", recipe); // Debugging line

            // Ensure _id is available before using it in Link and key
            if (!recipe._id) {
              console.warn("Recipe ID is missing for:", recipe);
              return null;
            }

            return (
              <div key={recipe._id} className="diet-recipe-card">
                <Link to={`/recipe/${recipe._id}`} className="diet-recipe-link">
                  <div className="diet-recipe-content">
                    {recipe.Images ? (
                      <img src={recipe.Images} alt={recipeName} className="diet-recipe-image" />
                    ) : (
                      <p className="diet-recipe-no-image">No image available</p>
                    )}
                    <h3 className="diet-recipe-title">{recipeName}</h3>
                  </div>
                </Link>
                <Link to={`/recipe/${recipe._id}`} className="diet-view-recipe-button">View Recipe</Link>
                <div
                  className={`wishlist-icon ${isInWishlist(recipe._id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(recipe)} // Toggle wishlist on click
                >
                  <i className={`bi ${isInWishlist(recipe._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Cake;
