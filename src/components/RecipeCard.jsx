// src/components/RecipeCard.jsx
import React from 'react';
import { useWishlist } from '../context/WishlistContext';

const RecipeCard = ({ recipe }) => {
    const { addToWishlist } = useWishlist();

    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <button onClick={() => addToWishlist(recipe)}>Add to Wishlist</button>
        </div>
    );
};

export default RecipeCard;
