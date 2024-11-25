import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">TasteOfIndia</Link>
        </div>

        {/* Hamburger Icon */}
        <button className="navbar-toggler" onClick={handleToggle}>
          <span className="navbar-toggler-icon">&#9776;</span>
        </button>

        {/* Menu */}
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-recipes">All Recipes</Link></li>
          
          {/* Dietary Dropdown */}
          <li className="nav-item dropdown">
            <Link to="#">Dietary ▼</Link>
            <ul className="dropdown-menu">
                <li><Link to="/diet/vegetarian">Vegetarian</Link></li>
                <li><Link to="/diet/non-vegetarian">Non-Vegetarian</Link></li>
                <li><Link to="/diet/vegan">Vegan</Link></li>
            </ul>
          </li>

          {/* Meal Dropdown */}
          <li className="nav-item dropdown">
            <Link to="#">Meal ▼</Link>
            <ul className="dropdown-menu">
              <li><Link to="/meal/breakfast">Breakfast</Link></li>
              <li><Link to="/meal/lunch">Lunch</Link></li>
              <li><Link to="/meal/dinner">Dinner</Link></li>
              <li><Link to="/meal/snacks">Snacks</Link></li>
            </ul>
          </li>

          {/* Ingredient Dropdown */}
          <li className="nav-item dropdown">
            <Link to="#">Ingredients ▼ </Link>
            <ul className="dropdown-menu">
              <li><Link to="/ingredients/chicken">Chicken</Link></li>
              <li><Link to="/ingredients/mutton">Mutton</Link></li>
              <li><Link to="/ingredients/seafood">Seafood</Link></li>
              <li><Link to="/ingredients/paneer">Paneer</Link></li>
              <li><Link to="/ingredients/vegetables">Vegetables</Link></li>
              <li><Link to="/ingredients/fruits">Fruits</Link></li>
              <li><Link to="/ingredients/all-ingredient">All Ingredients</Link></li>
            </ul>
          </li>

          {/* Taste Dropdown */}
          <li className="nav-item dropdown">
            <Link to="#">Taste ▼ </Link>
            <ul className="dropdown-menu">
              <li><Link to="/taste/sweet">Sweet</Link></li>
              <li><Link to="/taste/sour">Sour</Link></li>
              <li><Link to="/taste/salty">Salty</Link></li>
              <li><Link to="/taste/spicy">Spicy</Link></li>
              <li><Link to="/taste/pungent">Pungent</Link></li>
            </ul>
          </li>

          {/* Cuisine Dropdown */}
          <li className="nav-item dropdown">
            <Link to="#">Cuisine ▼ </Link>
            <ul className="dropdown-menu">
              <li><Link to="/cuisine">All Cuisines</Link></li>
              <li><Link to="/cuisine/maharashtrian">Maharashtrian</Link></li>
              <li><Link to="/cuisine/south Indian">South Indian</Link></li>
              <li><Link to="/cuisine/north Indian">North Indian</Link></li>
              <li><Link to="/cuisine/rajasthani">Rajasthani</Link></li>
              <li><Link to="/cuisine/gujarati">Gujarati</Link></li>
              <li><Link to="/cuisine/punjabi">Punjabi</Link></li>
              <li><Link to="/cuisine/west Indian">West Indian</Link></li>
              <li><Link to="/cuisine/east Indian">North-East Indian Cuisine</Link></li>
              <li><Link to="/cuisine/kashmiri">Kashmiri Cuisine</Link></li>
              <li><Link to="/cuisine/streetfood">Street Food</Link></li>
            </ul>
          </li>

          {/* Occasion Dropdown */}
          <li className="nav-item dropdown">
            <Link to="#">Occasion ▼ </Link>
            <ul className="dropdown-menu">
              <li><Link to="/occasion/holi">Holi</Link></li>
              <li><Link to="/occasion/diwali">Diwali</Link></li>
              <li><Link to="/occasion/eid">Eid</Link></li>
              <li><Link to="/occasion/navratri">Navratri</Link></li>
              <li><Link to="/occasion/pongal">Pongal</Link></li>
              <li><Link to="/occasion/ganesh-chaturthi">Ganesh Chaturthi</Link></li>
              <li><Link to="/occasion/christmas">Christmas</Link></li>
              <li><Link to="/occasion/onam">Onam</Link></li>
              <li><Link to="/occasion/birthday">Birthday</Link></li>
              <li><Link to="/occasion/wedding">Wedding</Link></li>
              <li><Link to="/occasion/makar-sankranti">Makar Sankranti</Link></li>
            </ul>
          </li>

          {/* Static Menu Items */}
          <li><Link to="/thela">Thela</Link></li>
          <li><Link to="/kitchen-tips">Kitchen Tips</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;