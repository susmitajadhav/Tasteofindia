import React from 'react';
import { Link } from 'react-router-dom';
import './UniqueFood.css';

const UniqueFood = () => {
  const foods = [
    {
      img: 'https://ichef.bbc.co.uk/ace/standard/1600/food/recipes/rainbow_cake_20402_16x9.jpg.webp',
      title: 'Cake',
      link: '/cake',
      recipes: 'View Recipe',
    },
    {
      img: 'https://img.freepik.com/premium-photo/variety-colorful-ice-creams-are-wooden-table_337384-5986.jpg',
      title: 'Ice Cream',
      link: '/ice-cream',
      recipes: 'View Recipe',
    },
  ];

  return (
    <div className="unique-food-container">
      <h1 className="unique-food-title">Creamy Craving</h1>
      <div className="unique-food-grid">
        {foods.map((food, index) => (
          <Link key={index} to={food.link} className="unique-food-link">
            <div className="unique-food-card">
              <img src={food.img} alt={food.title} />
              <div className="info">
                <h2>{food.title}</h2>
                <button className="recipe-btn">{food.recipes}</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UniqueFood;
