import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Recipe.css';
import { FaPrint, FaSave, FaShareAlt } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const [checkedProcess, setCheckedProcess] = useState([]);
    const [reviews, setReviews] = useState([
        { name: "John", review: "Great recipe! Easy to follow and delicious.", rating: 4.5 },
        { name: "Alice", review: "Tasty and perfect for a family dinner.", rating: 4.5 },
        { name: "Mark", review: "The cooking time was spot on, and it tasted amazing!", rating: 4.5 },
        { name: "Sophie", review: "My kids loved it, I will make this again!", rating: 4.5 },
    ]);

    const [newComment, setNewComment] = useState("");
    const [newName, setNewName] = useState("");

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newName.trim() && newComment.trim()) {
            const newReview = {
                name: newName,
                review: newComment,
                rating: 5, // Default rating for simplicity
            };
            setReviews((prevReviews) => [...prevReviews, newReview]);
            setNewComment("");
            setNewName("");
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/recipe/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setRecipe(data.data);
                }
            } catch (err) {
                console.error('An error occurred while fetching recipe details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    const handleSave = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text(recipe["RecipeName"], 20, 20);

        doc.setFontSize(12);
        doc.text(`Serves: ${recipe.Serves}`, 20, 30);
        doc.text(`Course: ${recipe.Course}`, 20, 40);
        doc.text(`Meals: ${recipe.Meals}`, 20, 50);
        doc.text(`Total Cook Time: ${recipe["Total Cook Time"]}`, 20, 60);
        doc.text(`Prep Time: ${recipe["Prep Time"]}`, 20, 70);
        doc.text(`Cook Time: ${recipe["Cook Time"]}`, 20, 80);
        doc.text(`Taste: ${recipe.Taste}`, 20, 90);
        doc.text(`Color: ${recipe.Color}`, 20, 100);
        doc.text(`Difficulty: ${recipe.Difficulties}`, 20, 110);
        doc.text(`Cuisine: ${recipe.Cuisine}`, 20, 120);
        doc.text(`Occasion: ${recipe.Occasion}`, 20, 130);
        doc.text(`Cooking Type: ${recipe["Cooking Type"]}`, 20, 140);

        doc.text('Ingredients:', 20, 150);
        const ingredients = recipe.Ingredients ? recipe.Ingredients.split('.') : [];
        ingredients.forEach((ingredient, index) => {
            if (ingredient.trim()) {
                doc.text(`${index + 1}. ${ingredient.trim()}`, 20, 160 + (index * 10));
            }
        });

        doc.text('Process:', 20, 160 + (ingredients.length * 10));
        const process = recipe.Process ? recipe.Process.split('\n') : [];
        process.forEach((step, index) => {
            doc.text(`${index + 1}. ${step.trim()}`, 20, 170 + ((ingredients.length + index) * 10));
        });

        doc.save(`${recipe["RecipeName"]}.pdf`);
    };

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

    const handleIngredientCheck = (index) => {
        setCheckedIngredients((prev) =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const handleProcessCheck = (index) => {
        setCheckedProcess((prev) =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const renderProcessSteps = (process) => {
        const lines = process.split('\n').map(line => line.trim()).filter(line => line !== '');
        let mainStepIndex = 0;
        let subStepIndex = 0;

        return lines.map((line, index) => {
            if (line.endsWith(':')) {
                mainStepIndex += 1;
                subStepIndex = 0;
                return (
                    <div key={index} style={{ marginTop: '10px' }}>
                        <strong>{String.fromCharCode(96 + mainStepIndex)}) {line}</strong>
                    </div>
                );
            } else {
                subStepIndex += 1;
                return (
                    <div key={index} style={{ marginLeft: '20px' }}>
                        <p>{subStepIndex}) {line}</p>
                    </div>
                );
            }
        });
    };

    const renderStarRating = (rating) => {
        const filledStars = Math.floor(rating);
        const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - filledStars - halfStar;

        return (
            <div className="star-rating">
                {'★'.repeat(filledStars)}
                {halfStar ? '★' : ''}
                {'☆'.repeat(emptyStars)}
            </div>
        );
    };

    if (loading) return <div className="loading">Loading...</div>;

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
                    <img src={recipe.Images || 'default_image_url.jpg'} alt={recipe["RecipeName"]} />
                </div>

                <div className="recipe-detail-content">
                    <div className="essential-details">
                        <div className="essential-details-column">
                            {Object.entries({
                                "Serves": recipe.Serves,
                                "Course": recipe.Course,
                                "Meals": recipe.Meals,
                                "Total Cook Time": recipe["Total Cook Time"],
                                "Prep Time": recipe["Prep Time"],
                                "Cook Time": recipe["Cook Time"],
                                "Taste": recipe.Taste,
                                "Color": recipe.Color,
                            }).map(([key, value]) => (
                                value && <p key={key}><strong>{key}:</strong> {value}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="recipe-process-section">
                <div className="recipe-ingredients">
                    <h2>Ingredients:</h2>
                    {recipe.Ingredients ? (
                        <ul>
                            {recipe.Ingredients.split('.').map((ingredient, index) => (
                                ingredient.trim() && (
                                    <li key={index}>
                                        <input
                                            type="checkbox"
                                            checked={checkedIngredients.includes(index)}
                                            onChange={() => handleIngredientCheck(index)}
                                        />
                                        {ingredient.trim()}
                                    </li>
                                )
                            ))}
                        </ul>
                    ) : <p>No ingredients listed.</p>}
                </div>

                <div className="recipe-process">
                    <h2>Process:</h2>
                    {recipe.Process ? (
                        renderProcessSteps(recipe.Process)
                    ) : <p>No process listed.</p>}
                </div>
            </div>

            <div className="customer-reviews">
                <h2>Customer Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <h4>{review.name}</h4>
                        <p>{renderStarRating(review.rating)}</p>
                        <p>{review.review}</p>
                    </div>
                ))}
                <form className="add-comment-form" onSubmit={handleAddComment}>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <textarea
                        placeholder="Add your review"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default Recipe;
