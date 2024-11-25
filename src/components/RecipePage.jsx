import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './RecipePage.css';

const RecipePage = () => {
    const { category } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipe?category=${category}`);
                if (response.data && response.data.data) {
                    setRecipes(response.data.data);
                } else {
                    setRecipes([]);
                }
            } catch (error) {
                setError("Failed to fetch recipes. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchRecipes();
        }
    }, [category]);

    const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

    const toggleWishlist = (recipe) => {
        if (isInWishlist(recipe._id)) {
            removeFromWishlist(recipe._id);
        } else {
            addToWishlist({ id: recipe._id, name: recipe.RecipeName, image: recipe.Images });
        }
    };

    if (loading) {
        return <div className="loading">Loading recipes...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="recipe-page-container">
            <h1 className="recipe-page-title">Recipes for {category}</h1>
            <div className="recipe-page-grid">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id} className="recipe-card">
                            <Link to={`/recipe/${recipe._id}`} className="recipe-link">
                                <img src={recipe.Images} alt={recipe.RecipeName} className="recipe-image" />
                                <h2 className="recipe-name">{recipe.RecipeName}</h2>
                            </Link>
                            <button
                                className="wishlist-button1"
                                onClick={() => toggleWishlist(recipe)}
                            >
                                <i className={`fas fa-heart ${isInWishlist(recipe._id) ? 'red' : ''}`}></i>
                            </button>
                            <Link to={`/recipe/${recipe._id}`} className="cara-view-recipe-button">
                                View Recipe
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="no-recipes-message">No recipes found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default RecipePage;
