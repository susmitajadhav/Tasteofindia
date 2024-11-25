import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>Where Every Meal Becomes a Masterpiece</h2>
          <p>Flavors that Inspire, Recipes that Delight!</p>
          <div className="social-icons">
            <a href="https://www.facebook.com" className="social-icon facebook" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/tasteofindia244" className="social-icon instagram" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="http://www.youtube.com/@tasteofindia24" className="social-icon youtube" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
            <a href="https://www.twitter.com" className="social-icon twitter" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all-recipes">All Recipes</Link></li>
            <li><Link to="/meal/dinner">Dinner Recipes</Link></li>
            <li><Link to="/diet/vegan">Vegan Recipes</Link></li>
            <li><Link to="/easy-recipes">Easy & Quick Recipes</Link></li>
            <li><Link to="/recipes/soup">Soup Recipes</Link></li>
            <li><Link to="/Cake">Cakes</Link></li>
            <li><Link to="/kitchen-tips">Kitchen Tips</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Info</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> Sangli</li>
            <li><i className="fas fa-phone-alt"></i> +91 12345 67890</li>
            <li><i className="fas fa-envelope"></i> tasteofindia@gmail.com</li>
          </ul>
        </div>

        <div className="footer-section support">
          <h3>Legal & Support</h3>
          <ul>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024TasteofIndia</p>
      </div>
    </footer>
  );
};

export default Footer;
