import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './AllRecipesPageStyles.css';

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  // Fetch recipes from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/recipe')
      .then(response => {
        setRecipes(response.data.data || []);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Check if a recipe is in the wishlist
  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  // Toggle wishlist
  const toggleWishlist = (recipe) => {
    if (isInWishlist(recipe._id)) {
      removeFromWishlist(recipe._id);
    } else {
      addToWishlist({ id: recipe._id, name: recipe.RecipeName, image: recipe.Images });
    }
  };

  // Group recipes alphabetically by the first letter
  const getGroupedRecipes = () => {
    const grouped = {};
    recipes.forEach((recipe) => {
      const firstLetter = recipe.RecipeName.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(recipe);
    });
    return grouped;
  };

  const groupedRecipes = getGroupedRecipes();
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Navigate to the recipe detail page
  const handleCardClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="all-recipes-container">
      <h1 className="all-recipes-heading">All Recipes </h1>

      {/* Alphabet Navigation Bar */}
      <div className="alphabet-nav">
        {alphabet.map((letter) => (
          <a key={letter} href={`#${letter}`} className="alphabet-link">
            {letter}
          </a>
        ))}
      </div>

      {/* Display Grouped Recipes */}
      <div className="recipes-list">
        {loading ? (
          <p className="loading-message">Loading recipes, please wait...</p>
        ) : (
          alphabet.map((letter) => (
            <div key={letter} id={letter} className="recipe-group">
              <h2 className="group-title">{letter}</h2>
              <div className="all-recipes-row">
                {groupedRecipes[letter] && groupedRecipes[letter].length > 0 ? (
                  groupedRecipes[letter].map((recipe) => (
                    <div className="all-recipes-col" key={recipe._id}>
                      <div
                        className="all-recipes-card"
                        onClick={() => handleCardClick(recipe._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img
                          src={recipe.Images}
                          alt={recipe.RecipeName}
                          className="all-recipes-card-img"
                        />
                        <div className="all-recipes-card-body">
                          <h5 className="all-recipes-card-title">{recipe.RecipeName}</h5>
                          <Link
                            to={`/recipe/${recipe._id}`}
                            className="all-view-recipe-button"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Recipe
                          </Link>
                          <div
                            className={`wishlist-icon ${isInWishlist(recipe._id) ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(recipe);
                            }}
                          >
                            <i className={`bi ${isInWishlist(recipe._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-recipes">No recipes found for {letter}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllRecipesPage;
