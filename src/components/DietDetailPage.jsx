// DietDetailPage.js
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import './DietDetailPage.css';

const DietDetailPage = () => {
    const { dietType = '', subDietType = '' } = useParams(); // Default to empty string if undefined
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist(); // Use context for wishlist management

    useEffect(() => {
        const fetchRecipes = async () => {
            let formattedDietaryType = subDietType || dietType;

            // Check if formattedDietaryType is defined and a string
            if (!formattedDietaryType || typeof formattedDietaryType !== 'string') {
                setError('Diet type is missing.');
                setLoading(false);
                return;
            }

            const dietMapping = {
                vegetarian: 'veg',
                veg: 'veg',
                nonvegetarian: 'non-veg',
                nonveg: 'non-veg',
                vegan: 'vegan',
            };

            formattedDietaryType = formattedDietaryType.replace(/[-\s]/g, '').toLowerCase();

            // Validate dietary type
            if (!dietMapping[formattedDietaryType]) {
                setError('Unknown dietary type');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const queryParam = `meals=${dietMapping[formattedDietaryType]}`;
                const response = await axios.get(`http://localhost:5000/api/recipe?${queryParam}`);

                console.log("API Response for Recipes:", response.data);

                if (response.data && response.data.data) {
                    setRecipes(response.data.data);
                } else {
                    setRecipes([]);
                    console.log("No recipes found.");
                }
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [dietType, subDietType]);

    const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

    const toggleWishlist = (recipe) => {
        if (isInWishlist(recipe._id)) {
            removeFromWishlist(recipe._id); // Remove if already in wishlist
        } else {
            addToWishlist({ id: recipe._id, name: recipe.RecipeName, image: recipe.Images }); // Add to wishlist
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
            <h1 className="diet-detail-title">{dietType.charAt(0).toUpperCase() + dietType.slice(1)} Recipes</h1>
            <div className="diet-recipe-grid">
                {recipes.length === 0 ? (
                    <p className="no-recipes-message">No recipes found</p>
                ) : (
                    recipes.map(recipe => {
                        const recipeName = recipe.RecipeName || "Unknown Recipe";
                        return (
                            <div key={recipe._id} className="diet-recipe-card">
                                <Link to={`/recipe/${recipe._id}`} className="diet-recipe-card-link">
                                    {recipe.Images ? (
                                        <img src={recipe.Images} alt={recipeName} className="diet-recipe-image" />
                                    ) : (
                                        <p className="diet-recipe-no-image">No image available</p>
                                    )}
                                    <h3 className="diet-recipe-title">{recipeName}</h3>
                                </Link>
                                {/* View Recipe Button */}
                                <Link to={`/recipe/${recipe._id}`} className="diet-view-recipe-button">View Recipe</Link>
                                {/* Wishlist heart icon */}
                                <div
                                    className={`wishlist-icon ${isInWishlist(recipe._id) ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent Link click from triggering
                                        toggleWishlist(recipe);
                                    }} 
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

export default DietDetailPage;
