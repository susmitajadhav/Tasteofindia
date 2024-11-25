// Blog.js
import React from 'react';
import './Blog.css';

const Blog = () => {
  const recipes = [
    {
      id: 1,
      title: "Medu Vada",
      image: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/08/medu-vada-4.jpeg",  // Replace with actual image URLs
      description: "A delicious and crispy South Indian fritter made from lentils, served with chutney."
    },
    {
      id: 2,
      title: "Chicken Biryani",
      image: "https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani.jpg",
      description: "A fragrant and flavorful rice dish cooked with mixed vegetables and spices."
    },
    {
      id: 3,
      title: "Paneer Tikka",
      image: "https://www.cookwithmanali.com/wp-content/uploads/2015/07/Restaurant-Style-Recipe-Paneer-Tikka.jpg",
      description: "Grilled cubes of marinated paneer served with mint chutney."
    },
    {
      id: 4,
      title: "Masala Dosa",
      image: "https://static01.nyt.com/images/2015/01/28/dining/28KITCHEN1/28KITCHEN1-jumbo.jpg?quality=75&auto=webp",
      description: "A thin, crispy dosa filled with a spiced potato filling."
    },
    {
      id: 5,
      title: "Samosa",
      image: "https://www.cookwithnabeela.com/wp-content/uploads/2024/02/ChickenSamosa.webp",
      description: "Samosas topped with yogurt, and fresh herbs for a zesty snack."
    },
    {
      id: 6,
      title: "Idli",
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/idli-recipe-3.jpg",
      description: "Soft idlis served with a flavorful lentil-based sambar."
    }
  ];

  return (
    <div className="blog-page">
      <h1>Recipe Blog</h1>
      <div className="recipe-cards">
        {recipes.map(recipe => (
          <div className="blog-post" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} className="post-image" />
            <div className="post-content">
              <h2 className="post-title">{recipe.title}</h2>
              <p className="post-description">{recipe.description}</p>
              <button className="read-more">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;