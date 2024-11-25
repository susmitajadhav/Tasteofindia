import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import './AllRecipesPageStyles.css'; // Reusing the same CSS for styling

const EasyRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist(); // Use context for wishlist management

  useEffect(() => {
    // Fetch only 'easy' recipes from the backend
    axios.get('http://localhost:5000/api/recipe?category=easy') // Adjust API endpoint to filter by 'easy' category
      .then(response => {
        setRecipes(response.data.data); // Assuming the response has a 'data' field with recipe data
      })
      .catch(error => {
        console.error('Error fetching easy recipes:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  }, []);

  // Check if a recipe is in the wishlist
  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  // Handle wishlist toggle
  const toggleWishlist = (recipe) => {
    if (isInWishlist(recipe._id)) {
      removeFromWishlist(recipe._id); // Remove if already in wishlist
    } else {
      addToWishlist({ id: recipe._id, name: recipe.RecipeName, image: recipe.Images }); // Add to wishlist
    }
  };

  return (
    <div className="all-recipes-container">
      <h1 className="all-recipes-heading">Quick & Easy Recipes</h1> {/* Page Title changed */}
      <div className="all-recipes-row">
        {loading ? ( // Show loading indicator while fetching
          <p className="loading-message">Loading recipes, please wait...</p>
        ) : (
          recipes.length === 0 ? (
            <p>No quick & easy recipes found!</p>
          ) : (
            recipes.map((recipe) => (
              <div className="all-recipes-col" key={recipe._id}>
                <div className="all-recipes-card">
                  {/* Recipe image */}
                  <img
                    src={recipe.Images}
                    alt={recipe.RecipeName}
                    className="all-recipes-card-img"
                  />
                  <div className="all-recipes-card-body">
                    {/* Recipe title */}
                    <h5 className="all-recipes-card-title">{recipe.RecipeName}</h5>
                    {/* Button to view the recipe */}
                    <Link to={`/recipe/${recipe._id}`} className="all-view-recipe-button">
                      View Recipe
                    </Link>
                    {/* Wishlist heart icon */}
                    <div
                      className={`wishlist-icon ${isInWishlist(recipe._id) ? 'active' : ''}`}
                      onClick={() => toggleWishlist(recipe)} // Toggle wishlist on click
                    >
                      <i className={`bi ${isInWishlist(recipe._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </div>
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

export default EasyRecipesPage;
