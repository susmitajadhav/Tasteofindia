import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import EmailJS
import './AddRecipePage.css';

function AddRecipePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false); // Define showPopup state
    const [recipe, setRecipe] = useState({
        RecipeName: "",
        Category: "",
        Ingredients: "",
        Process: "",
        TotalCookTime: "",
        PrepTime: "",
        CookTime: "",
        SettingTime: "",
        SoakingTime: "",
        RestingTime: "",
        Serves: "",
        Taste: "",
        Color: "",
        Course: "",
        DifficultyLevel: "",
        State: "",
        Video: "",
        CookingType: "",
        Cuisine: "",
        Occasion: "",
        Drinks: "",
        Images: null
    });
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/validate-token', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    throw new Error('Token validation failed');
                }
            } catch (error) {
                console.error('Error during token validation:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [token]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setRecipe({ ...recipe, [name]: type === "file" ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Use EmailJS to send the recipe
            const templateParams = {
                recipeName: recipe.RecipeName,
                category: recipe.Category,
                ingredients: recipe.Ingredients,
                process: recipe.Process,
                totalCookTime: recipe.TotalCookTime,
                prepTime: recipe.PrepTime,
                cookTime: recipe.CookTime,
                settingTime: recipe.SettingTime,
                soakingTime: recipe.SoakingTime,
                restingTime: recipe.RestingTime,
                serves: recipe.Serves,
                taste: recipe.Taste,
                color: recipe.Color,
                course: recipe.Course,
                difficultyLevel: recipe.DifficultyLevel,
                state: recipe.State,
                video: recipe.Video,
                cookingType: recipe.CookingType,
                cuisine: recipe.Cuisine,
                occasion: recipe.Occasion,
                drinks: recipe.Drinks,
                images: recipe.Images ? recipe.Images.name : '', // Send image name
            };
    
            // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual IDs
            const response = await emailjs.send('service_xzljbuu', 'template_33n3j32', templateParams, 'mpaGaNvRfp0sKHW5P');
    
            console.log('Email sent successfully:', response.text);
    
            // Show the success popup
            setShowPopup(true); 
            
            // Hide the popup after 3 seconds and then navigate to the home page
            setTimeout(() => {
                setShowPopup(false);
                navigate('/'); // Navigate to home page after the popup disappears
            }, 3000);
    
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };
    
    useEffect(() => {
        if (!isLoading && isAuthenticated === false) {
            navigate('/login');
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isAuthenticated === false) {
        return <p>Redirecting to login...</p>;
    }

    const categories = ["Vegetarian", "Non-Vegetarian", "Vegan"];
    const tastes = ["Sweet", "Sour", "Salty", "Spicy", "Pungent"];
    const courses = ["Breakfast", "Lunch", "Dinner", "Snacks"];
    const difficultyLevels = ["1", "2", "3"];
    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
        "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
        "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
        "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];
    const cuisines = [
        "Maharashtrian", "South Indian", "North Indian", "West Indian",
        "North-East Indian", "Gujarati", "Rajasthani", "Kashmiri"
    ];

    return (
        <div className="add-recipe-page">
            <div className="add-recipe-container">
                <h2 className="form-header">Add Recipe</h2>
                <form onSubmit={handleSubmit} className="animated-form">
                    {Object.keys(recipe).map((key) => {
                        if (key === "Images") {
                            return (
                                <div className="form-group" key={key}>
                                    <label htmlFor={key}>Upload Image</label>
                                    <input
                                        type="file"
                                        id={key}
                                        name={key}
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                            );
                        }
                        if (key === "Category") {
                            return (
                                <div className="form-group" key={key}>
                                    <label htmlFor={key}>Category</label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={recipe[key]}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        if (key === "Taste") {
                            return (
                                <div className="form-group" key={key}>
                                    <label htmlFor={key}>Taste</label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={recipe[key]}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select Taste</option>
                                        {tastes.map((taste) => (
                                            <option key={taste} value={taste}>{taste}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        if (key === "Course") {
                            return (
                                <div className="form-group" key={key}>
                                    <label htmlFor={key}>Course</label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={recipe[key]}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select Course</option>
                                        {courses.map((course) => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        if (key === "DifficultyLevel") {
                            return (
                                <div className="form-group" key={key}>
                                    <label htmlFor={key}>Difficulty Level</label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={recipe[key]}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select Difficulty Level</option>
                                        {difficultyLevels.map((level) => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        if (key === "State") {
                            return (
                                <div className="form-group" key={key}>
                                    <label htmlFor={key}>State</label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={recipe[key]}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        if (key === "Cuisine") {
                            return (
                                <div className="form-group" key={key}>
                                    <label htmlFor={key}>Cuisine</label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={recipe[key]}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select Cuisine</option>
                                        {cuisines.map((cuisine) => (
                                            <option key={cuisine} value={cuisine}>{cuisine}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }
                        return (
                            <div className="form-group" key={key}>
                                <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
                                <input
                                    type="text"
                                    id={key}
                                    name={key}
                                    value={recipe[key]}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                        );
                    })}
                    <button type="submit" className="submit-button">Submit</button>
                </form>

                {showPopup && (
                    <div className="popup">
                        <p>Recipe submitted successfully!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddRecipePage;
