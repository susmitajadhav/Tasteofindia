import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ThelaMenuStyles.css';

const ThelaMenu = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const [thelaResponse, streetFoodResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/recipe', { params: { category: 'Thela' } }),
                    axios.get('http://localhost:5000/api/recipe', { params: { category: 'Street Food' } }),
                ]);

                const thelaRecipes = thelaResponse.data?.data || [];
                const streetFoodRecipes = streetFoodResponse.data?.data || [];
                const combinedRecipes = [...thelaRecipes, ...streetFoodRecipes];

                if (combinedRecipes.length > 0) {
                    setRecipes(combinedRecipes);
                } else {
                    setError('No recipes found for Thela or Street Food.');
                }
            } catch (err) {
                setError('Error fetching recipes. Please try again later.');
                console.error('Error fetching recipes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const toggleWishlist = (recipeId) => {
        setWishlist((prev) => {
            if (prev.includes(recipeId)) {
                return prev.filter(id => id !== recipeId);
            } else {
                return [...prev, recipeId];
            }
        });
    };

    const isInWishlist = (recipeId) => wishlist.includes(recipeId);

    if (loading) return <div className="spinner-border">Loading Recipes...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="thela-container">
            <h1 className="thela-heading">Thela Menu</h1>
            <div className="thela-description">
                <img
                    src="https://mir-s3-cdn-cf.behance.net/projects/404/022ab2179873579.Y3JvcCwxMzczLDEwNzQsMjY1LDA.jpg"
                    alt="Thela Menu"
                    className="thela-image"
                />
                <p>Welcome to our Thela Menu! Discover a wide range of delicious street food and recipes made with love. Each recipe is crafted to bring you the true flavors of the streets, offering a blend of traditional and modern tastes.</p>
            </div>
            <div className="thela-row">
                {recipes.map((recipe) => (
                    <div className="thela-card" key={recipe._id}>
                        <img
                            src={recipe.Images || 'https://via.placeholder.com/150'}
                            alt={recipe['RecipeName'] || 'Recipe Image'}
                            className="thela-card-img"
                        />
                        <div className="thela-card-body">
                            <h5 className="thela-card-title">{recipe['RecipeName'] || 'No Name'}</h5>
                        </div>
                        {/* Wishlist Button */}
                        <button
                            className={`wishlist-button ${isInWishlist(recipe._id) ? 'red' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                toggleWishlist(recipe._id);
                            }}
                        >
                            <i className={`fas fa-heart ${isInWishlist(recipe._id) ? 'red' : ''}`}></i>
                        </button>
                        <Link to={`/recipe/${recipe._id}`} className="thela-view-recipe-button">
                            View Recipe
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThelaMenu;
