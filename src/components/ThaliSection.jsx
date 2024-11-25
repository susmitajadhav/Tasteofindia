import React from 'react';
import './ThaliSection.css';

const ThaliSection = () => {
  return (
    <section className="thali-container">
      {/* Card for Indian Thali */}
      <div className="thali-card">
        <div className="card-header">
          <h2 className="thali-title">Indian Thali</h2>
         
        </div>
        <p className="thali-slogan">Experience the flavors of India!</p>
        <img
          src="https://img.freepik.com/free-photo/delicious-food-table_23-2150857814.jpg?t=st=1729666020~exp=1729669620~hmac=7138e9fd4d8caa341586ab2a6333cc4870d57749a5e0b9371c42bbd2042f0603&w=826"
          alt="Indian Thali"
          className="thali-image thali-animated"
        />
        <a href="/thali" className="thali-btn btn-animated">View Thalis</a>
      </div>

      {/* Card for Easy and Quick Recipes */}
      <div className="thali-card">
        <div className="card-header">
          <h2 className="thali-title"> Quick Recipes</h2>
        
        </div>
        <p className="thali-slogan">Delicious meals in no time!</p>
        <img
          src="https://img.freepik.com/free-photo/top-view-tasty-meat-soup-with-potatoes-seasonings-dark-floor_140725-76946.jpg?t=st=1729666499~exp=1729670099~hmac=8e98429185d2e5feaea21f635f64b3ba3b20e72e9f3cfec201d0384ea618a77a&w=740"
          alt="Easy Recipes"
          className="thali-image thali-animated"
        />
        <a href="/easy-recipes" className="thali-btn btn-animated">View Recipes</a>
      </div>
    </section>
  );
};

export default ThaliSection;
