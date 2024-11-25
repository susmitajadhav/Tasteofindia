import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext'; // Import wishlist context
import './OccasionDetailPage.css';

const OccasionDetailPage = () => {
  const { occasionName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  // Fetch recipes from the backend based on the occasion
  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/recipe?occasion=${occasionName}`);
      const data = await response.json();

      if (response.ok) {
        setRecipes(data.data); // Store the recipe data
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [occasionName]);

  const handleWishlistToggle = (recipe) => {
    const isInWishlist = wishlistItems && wishlistItems.some(item => item.id === recipe._id);
    if (isInWishlist) {
      removeFromWishlist(recipe._id);
    } else {
      addToWishlist({
        id: recipe._id,
        name: recipe["RecipeName"],
        image: recipe.Images,
      });
    }
  };

  const isInWishlist = (recipeId) => {
    return Array.isArray(wishlistItems) && wishlistItems.some(item => item.id === recipeId);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="occasion-detail-container">
      <h1 className="occasion-detail-title">Recipes for {occasionName}</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="occasion-detail-list">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe._id} className="occasion-detail-card">
              {/* Entire card is now clickable */}
              <Link to={`/recipe/${recipe._id}`} className="occasion-detail-link">
                <div className="occasion-detail-card-content">
                  <img
                    src={recipe.Images}
                    alt={recipe["RecipeName"]}
                    className="occasion-detail-image"
                  />
                  <h2 className="occasion-detail-title-text">{recipe["RecipeName"]}</h2>
                </div>
              </Link>

              {/* Wishlist Button */}
              <button
                className="wishlist-button2"
                onClick={(e) => {
                  e.preventDefault();
                  handleWishlistToggle(recipe);
                }}
              >
                <i className={`fas fa-heart ${isInWishlist(recipe._id) ? 'red' : ''}`}></i>
              </button>

              {/* View Recipe Button */}
              <Link to={`/recipe/${recipe._id}`} className="Occasion-view-recipe-button">
                View Recipe
              </Link>
            </div>
          ))
        ) : (
          <p className="no-recipes-message">No recipes found for this occasion.</p>
        )}
      </div>
    </div>
  );
};

export default OccasionDetailPage;
