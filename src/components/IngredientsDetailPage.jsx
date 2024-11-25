import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext';
import './IngredientsDetailStyles.css';

const IngredientsDetailPage = () => {
    const { ingredientName } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

    // Normalize ingredient name
    const normalizeIngredientName = (name) => {
        return name ? name.toLowerCase().replace(/[-\s]/g, '') : '';  // Handle null/undefined cases safely
    };

    // Fetch recipes based on ingredient
    const fetchIngredientRecipes = async () => {
        try {
            const normalizedIngredient = normalizeIngredientName(ingredientName);
            if (!normalizedIngredient) {
                throw new Error('Invalid ingredient name.');
            }

            const encodedIngredient = encodeURIComponent(normalizedIngredient);  // Encode the ingredient name
            console.log(`Fetching recipes for: ${encodedIngredient}`);  // Debug log

            const response = await axios.get(`http://localhost:5000/api/recipe?category=${encodedIngredient}`);
            console.log(response.data);  // Debug log to see the response data

            if (response.data && response.data.data) {
                setRecipes(response.data.data);
            } else {
                setRecipes([]);  // Ensure empty array if no data
            }
        } catch (err) {
            console.error('Error fetching recipes:', err);  // Log the error
            setError('Failed to load recipes. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Use effect to fetch data on component mount
    useEffect(() => {
        if (ingredientName) {
            setLoading(true);  // Set loading state when ingredientName changes
            fetchIngredientRecipes();
        } else {
            setError('Ingredient name is missing.');
            setLoading(false);
        }
    }, [ingredientName]);

    // Toggle wishlist (add or remove)
    const toggleWishlist = (recipe) => {
        const isInWishlist = wishlistItems.some(item => item.id === recipe._id);
        if (isInWishlist) {
            removeFromWishlist(recipe._id);
        } else {
            addToWishlist({ id: recipe._id, name: recipe['RecipeName'], image: recipe.Images });
        }
    };

    // Check if a recipe is in the wishlist
    const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

    // Loading state
    if (loading) return <div className="loading">Loading...</div>;

    // Error state
    if (error) return <div className="error-message">{error}</div>;

    // No recipes found state
    if (recipes.length === 0) return <div className="no-recipes-message">No recipes found for this ingredient.</div>;

    return (
        <div className="ingredient-detail-container">
            <h1 className="ingredient-title">Recipes for {ingredientName}</h1>
            <div className="ingredient-recipe-list">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="ingredient-recipe-card">
                        <Link to={`/recipe/${recipe._id}`} className="ingredient-recipe-link">
                            <img
                                src={recipe.Images ? recipe.Images : '/images/default-recipe.jpg'}
                                alt={recipe['RecipeName'] || 'Recipe'}
                                className="ingredient-recipe-image"
                            />
                            <h2 className="ingredient-recipe-name">{recipe['RecipeName'] || 'Unnamed Recipe'}</h2>
                        </Link>
                        
                        {/* View Recipe Button */}
                        <Link to={`/recipe/${recipe._id}`} className="ingredient-view-recipe-button">
                            View Recipe
                        </Link>

                        {/* Wishlist Button */}
                        <button
                            className="wishlist-button"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleWishlist(recipe);
                            }}
                            aria-label={isInWishlist(recipe._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            <i className={`fas fa-heart ${isInWishlist(recipe._id) ? 'red' : ''}`}></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientsDetailPage;
