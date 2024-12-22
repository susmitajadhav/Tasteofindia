import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './ThaliDetailPage.css';

const ThaliDetailPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

    // Fetching thali recipes from API
    useEffect(() => {
        axios.get('https://backend-testofindia.onrender.com/api/recipe?category=thali')
            .then(response => setRecipes(response.data.data || []))
            .catch(error => console.error('Error fetching thali recipes:', error))
            .finally(() => setLoading(false));
    }, []);

    // Check if recipe is in the wishlist
    const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

    // Toggle wishlist item
    const toggleWishlist = (recipe) => {
        if (isInWishlist(recipe._id)) {
            removeFromWishlist(recipe._id);
        } else {
            addToWishlist({
                id: recipe._id,
                name: recipe.RecipeName,
                image: recipe.Images || '/images/default-recipe.jpg',
            });
        }
    };

    return (
        <div className="thali-recipes-container">
            <h1 className="thali-recipes-heading">Thali Recipes</h1>
            <div className="thali-recipes-grid">
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    recipes.length === 0 ? (
                        <p className="no-recipes-message">No thali recipes found!</p>
                    ) : (
                        recipes.map((recipe) => (
                            <div className="thali-recipe-card" key={recipe._id}>
                                <Link to={`/recipe1/${recipe._id}`} className="thali-recipe-link">
                                    <img
                                        src={recipe.Images || '/images/default-recipe.jpg'}
                                        alt={recipe.RecipeName}
                                        className="thali-recipe-image"
                                    />
                                </Link>
                                <div className="thali-recipe-details">
                                    <h5 className="thali-recipe-title">{recipe.RecipeName || 'Unnamed Recipe'}</h5>
                                    <Link to={`/recipe1/${recipe._id}`} className="thali-view-recipe-button">
                                        View Recipe
                                    </Link>
                                    <div
                                        className={`thali-wishlist-icon ${isInWishlist(recipe._id) ? 'active' : ''}`}
                                        onClick={() => toggleWishlist(recipe)}
                                    >
                                        <i className={`bi ${isInWishlist(recipe._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
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

export default ThaliDetailPage;
