import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext';
import './SearchRecipeStyles.css';

const SearchRecipe = () => {
  const location = useLocation();
  const { query } = location.state || { query: '' };
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipe/search?query=${query}`);
        setResults(response.data.data || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchRecipes();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="all-recipes-container">
      <h1 className="all-recipes-heading">Search Results for "{query}"</h1>
      <div className="all-recipes-row">
        {loading ? (
          <p className="loading-message">Loading recipes, please wait...</p>
        ) : (
          results.length === 0 ? (
            <p>No recipes found for "{query}".</p>
          ) : (
            results.map((recipe) => (
              <div className="all-recipes-col" key={recipe._id}>
                <div className="all-recipes-card">
                  <img
                    src={recipe.Images}
                    alt={recipe.RecipeName}
                    className="all-recipes-card-img"
                  />
                  <div className="all-recipes-card-body">
                    <h5 className="all-recipes-card-title">{recipe.RecipeName}</h5>
                    
                    {/* Button to view the recipe */}
                    <Link to={`/recipe/${recipe._id}`} className="view-recipe-button">
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default SearchRecipe;
