import React, { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom'; // Ensure Link is imported
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import './MealDetailPage.css'; // Import the custom CSS file

const MealDetailPage = () => {
    const { mealType } = useParams(); // Get the meal type from URL parameters
    const [mealData, setMealData] = useState([]); // State to hold meal data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to hold any error messages
    const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist(); // Use wishlist context

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                setLoading(true); // Set loading to true while fetching
                const courseName = mealType.toLowerCase(); // Convert mealType to lowercase for API compatibility

                // Fetch data based on the course name
                const response = await fetch(`http://localhost:5000/api/recipe?course=${courseName}`);

                if (!response.ok) {
                    const errorMessage = await response.text(); // Get error message as text
                    console.error('Error fetching meal data:', errorMessage);
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
                }

                const data = await response.json(); // Parse the JSON response
                setMealData(data.data || data); // Set the fetched data into state (Ensure correct data structure)
            } catch (error) {
                console.error('Caught error:', error); // Log errors for debugging
                setError(error.message); // Set the error message
            } finally {
                setLoading(false); // Turn off loading spinner after fetch is complete
            }
        };

        fetchMealData(); // Fetch meal data when component mounts or when mealType changes
    }, [mealType]);
    
    // Render loading state
    if (loading) return <div className="meal-loading">Loading...</div>;

    // Render error state
    if (error) return <div className="meal-error">Error: {error}</div>;

    // Check if a meal is in the wishlist
    const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

    // Handle wishlist toggle
    const toggleWishlist = (recipe) => {
        if (isInWishlist(recipe._id)) {
            removeFromWishlist(recipe._id); // Remove if already in wishlist
        } else {
            addToWishlist({ id: recipe._id, name: recipe.RecipeName, image: recipe.Images }); // Add to wishlist
        }
    };

    // Render the meal details if data is available
    return (
        <div className="meal-detail-page">
            <h2 className="meal-title">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2> {/* Display meal type with the first letter capitalized */}
            <div className="meal-details">
                {mealData.length === 0 ? (
                    <div className="meal-no-data">No recipes found for {mealType}</div> // Handle case when no data is returned
                ) : (
                    mealData.map((item) => (
                        <div key={item._id} className="meal-recipe-card"> {/* Unique key for each item */}
                            <Link to={`/recipe/${item._id}`} className="meal-recipe-link"> {/* Make entire card clickable */}
                                <img 
                                    src={item.Images || 'default-placeholder-image.jpg'}  // Display recipe image or a placeholder if no image is found
                                    alt={item.RecipeName || 'Recipe'} 
                                    className="meal-recipe-image"
                                /> 
                                <h5 className="meal-recipe-title">{item.RecipeName || 'Unnamed Recipe'}</h5> {/* Display recipe name or fallback to 'Unnamed Recipe' */}
                            </Link>
                            
                            {/* Wishlist heart icon */}
                            <div
                                className={`wishlist-icon ${isInWishlist(item._id) ? 'active' : ''}`}
                                onClick={() => toggleWishlist(item)} // Toggle wishlist on click
                            >
                                <i className={`bi ${isInWishlist(item._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                            </div>

                            {/* Button to view the recipe details */}
                            <Link to={`/recipe/${item._id}`} className="view-recipe-button">
                                View Recipe
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MealDetailPage;
