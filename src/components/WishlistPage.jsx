import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import './WishlistPageStyles.css'; // Updated styles

const WishlistPage = () => {
  const { wishlistItems } = useWishlist();

  if (!wishlistItems.length) {
    return <p>Your wishlist is empty!</p>;
  }

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-card">
            <Link to={`/recipe/${item.id}`} className="wishlist-link">
              <img src={item.image} alt={item.name} className="wishlist-image" />
              <div className="wishlist-card-body">
                <h5 className="wishlist-title">{item.name}</h5>
                <Link to={`/recipe/${item.id}`} className="wish-view-recipe-button">
                  View Recipe
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
