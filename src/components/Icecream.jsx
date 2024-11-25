import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import { Link } from 'react-router-dom';
import './DietDetailPage.css'; // Assuming you want to use the same styles

const Icecream = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist(); // Use context for wishlist management

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/recipe?category=icecream'); // Fetch ice cream recipes

        console.log("API Response for Ice Cream Recipes:", response.data);

        if (response.data && response.data.data) {
          setRecipes(response.data.data);
        } else {
          setRecipes([]);
          console.log("No recipes found.");
        }
      } catch (error) {
        console.error("Error fetching ice cream recipes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  const toggleWishlist = (recipe) => {
    if (isInWishlist(recipe._id)) {
      removeFromWishlist(recipe._id); // Remove if already in wishlist
    } else {
      addToWishlist({ id: recipe._id, name: recipe.RecipeName, image: recipe.Images || '/images/default-recipe.jpg' }); // Add to wishlist
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="diet-detail-page">
      <h1 className="diet-detail-title">Ice Cream Recipes</h1>
      <div className="diet-recipe-grid">
        {recipes.length === 0 ? (
          <p className="no-recipes-message">No recipes found</p>
        ) : (
          recipes.map(recipe => {
            const recipeName = recipe.RecipeName || "Unknown Recipe";
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
                <Link to={`/recipe/${recipe._id}`} className="diet-view-recipe-button ">View Recipe</Link>
                <div
                  className={`wishlist-icon ${isInWishlist(recipe._id) ? 'active' : ''}`}
                  onClick={() => toggleWishlist(recipe)}
                  aria-label={`Add or remove ${recipeName} from wishlist`}
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

export default Icecream;
