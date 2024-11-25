import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './TasteDetailPage.css';

const TasteDetailPage = () => {
  const { tasteName } = useParams(); // Extract taste name from URL
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Wishlist context functions
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  // Fetch recipes based on taste name from the backend
  const fetchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/recipe?taste=${tasteName}`);
      const data = await response.json();

      if (response.ok) {
        setRecipes(data.data);
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
  }, [tasteName]);

  // Handle adding/removing recipe from wishlist
  const handleWishlistToggle = (recipe) => {
    const isInWishlist = wishlistItems && wishlistItems.some(item => item.id === recipe._id);
    if (isInWishlist) {
      removeFromWishlist(recipe._id);
    } else {
      addToWishlist({
        id: recipe._id,
        name: recipe.RecipeName,
        image: recipe.Images,
      });
    }
  };

  const isInWishlist = (recipeId) => {
    return wishlistItems && Array.isArray(wishlistItems) && wishlistItems.some(item => item.id === recipeId);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="taste-details-container">
      <h2 className="taste-details-heading">
        {tasteName.charAt(0).toUpperCase() + tasteName.slice(1)}
      </h2>

      {error && <p className="error-message">{error}</p>}

      <div className="taste-details-row">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe._id} className="taste-details-card">
              <Link to={`/recipe/${recipe._id}`} className="taste-details-link">
                <img
                  src={recipe.Images}
                  alt={recipe.RecipeName}
                  className="taste-details-card-img"
                />
                <h5 className="taste-details-card-title">{recipe.RecipeName}</h5>
              </Link>

              {/* View Recipe button */}
              <Link to={`/recipe/${recipe._id}`} className="taste-view-recipe-button">
                View Recipe
              </Link>

              {/* Wishlist button to toggle the heart icon */}
              <button
                className="wishlist-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleWishlistToggle(recipe);
                }}
              >
                <i className={`fas fa-heart ${isInWishlist(recipe._id) ? 'red' : ''}`}></i>
              </button>
            </div>
          ))
        ) : (
          <p className="no-recipes-message">No recipes found for this taste.</p>
        )}
      </div>
    </div>
  );
};

export default TasteDetailPage;
