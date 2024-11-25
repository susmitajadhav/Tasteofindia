import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Recipe.css';
import { FaPrint, FaSave, FaShareAlt } from 'react-icons/fa';

const Recipe1 = () => {
    const { id } = useParams();
    const navigate = useNavigate();  // useNavigate instead of useHistory
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the recipe data
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/recipe/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setRecipe(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('An error occurred while fetching recipe details.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    // Fetch recipe by name and redirect to its id
    const handleRecipeLinkClick = async (recipeName) => {
        try {
            console.log('Fetching recipe for:', recipeName); // Debugging log
            const response = await fetch(`http://localhost:5000/api/recipe?name=${encodeURIComponent(recipeName)}`);
            const data = await response.json();
    
            if (response.ok && data.data.length > 0) {
                const matchedRecipe = data.data.find(recipe => recipe.RecipeName === recipeName);
    
                if (matchedRecipe) {
                    navigate(`/recipe/${matchedRecipe._id}`);  // Navigate to the matched recipe
                } else {
                    alert('Recipe not found!');
                }
            } else {
                alert('No recipes found!');
            }
        } catch (error) {
            console.error('Error fetching recipe by name:', error);
            alert('Error retrieving the recipe.');
        }
    };
    
    // Print the recipe
    const handlePrint = () => {
        window.print();
    };

    // Save the recipe as a JSON file
    const handleSave = () => {
        const recipeData = JSON.stringify(recipe);
        const blob = new Blob([recipeData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${recipe["RecipeName"]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Share the recipe link
    const handleShare = async () => {
        const shareData = {
            title: recipe["RecipeName"],
            text: `Check out this recipe: ${recipe["RecipeName"]}`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Recipe link copied to clipboard!");
            }
        } catch (error) {
            console.error("Error sharing recipe:", error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    // Parse RecipeLinks to create links for each item
    const recipeLinks = recipe.RecipeLinks ? recipe.RecipeLinks.split(',').map(link => link.trim()).filter(link => link) : [];

    return (
        <div className="recipe-detail-container">
            <div className="recipe-header">
                <h1 className="recipe-title">{recipe["RecipeName"]}</h1>
                <div className="recipe-buttons">
                    <button className="btn" onClick={handlePrint}>
                        <FaPrint /> Print
                    </button>
                    <button className="btn" onClick={handleSave}>
                        <FaSave /> Save
                    </button>
                    <button className="btn" onClick={handleShare}>
                        <FaShareAlt /> Share
                    </button>
                </div>
            </div>

            <div className="recipe-detail-grid">
                <div className="recipe-detail-image">
                    <div className="image-container">
                        <img src={recipe.Images || 'default_image_url.jpg'} alt={recipe["RecipeName"]} />
                    </div>
                    {recipe.ImagesSource && (
                        <div className="image-source">
                            <strong>Credit:</strong> <a href={recipe.ImagesSource} target="_blank" rel="noopener noreferrer">{recipe.ImagesSource}</a>
                        </div>
                    )}
                </div>

                <div className="recipe-detail-content">
                    <div className="essential-details">
                        <div className="essential-details-column">
                            {Object.entries({
                                "Serves": recipe.Serves,
                                "Course": Array.isArray(recipe.Course) ? recipe.Course.join(", ") : recipe.Course,
                                "Meals": recipe.Meals,
                                "Total Cook Time": recipe["Total Cook Time"],
                                "Prep Time": recipe["Prep Time"],
                                "Cook Time": recipe["Cook Time"],
                              
                            }).map(([key, value]) => (
                                value && <p key={key}><strong>{key}:</strong> {value}</p>
                            ))}
                        </div>
                        <div className="essential-details-column">
                            {Object.entries({
                                "Difficulties": recipe.Difficulties,
                                "Cuisine": recipe.Cuisine,
                                "Occasion": recipe.Occasion,
                                "Cooking Type": recipe["Cooking Type"],
                                "Drinks": recipe.Drinks,
                                "Sugar/SugarFree": recipe["Sugar/SugarFree"],
                            }).map(([key, value]) => (
                                value && <p key={key}><strong>{key}:</strong> {value}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="recipe-links-section">
                <h2>Recipe Links:</h2>
                {recipeLinks.length > 0 ? (
                    <ul>
                        {recipeLinks.map((link, index) => (
                            <li key={index}>
                                <button 
                                    className="recipe-link-button"
                                    onClick={() => handleRecipeLinkClick(link)}
                                >
                                    {link}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No linked recipes available.</p>
                )}
            </div>

            {recipe.VideoLink && (
                <div className="recipe-video">
                    <h2>Video Tutorial</h2>
                    <iframe
                        width="100%"
                        height="315"
                        src={recipe.VideoLink.replace("watch?v=", "embed/")}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default Recipe1;
