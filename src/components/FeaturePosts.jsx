import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext'; // Import the wishlist context
import './FeaturePosts.css';

const FeaturePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist(); // Use context for wishlist management
  const [showWishlist, setShowWishlist] = useState(true); // Add state for showWishlist

  useEffect(() => {
    // Fetch recipes from the backend (replace with your actual endpoint)
    axios.get('http://localhost:5000/api/recipe?category=Feature')
      .then(response => {
        setPosts(response.data.data); // Assuming the response has a 'data' field with recipe data
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching
      });
  }, []);

  // Check if a recipe is in the wishlist
  const isInWishlist = (recipeId) => wishlistItems.some(item => item.id === recipeId);

  // Handle wishlist toggle
  const toggleWishlist = (recipe) => {
    if (isInWishlist(recipe._id)) {
      removeFromWishlist(recipe._id); // Remove if already in wishlist
    } else {
      addToWishlist({ id: recipe._id, name: recipe.RecipeName, image: recipe.Images }); // Add to wishlist
    }
  };

  return (
    <div className="feature-container">
      <h2>Feature Posts</h2>
      <div className="posts-grid">
        {loading ? (
          <p className="loading-message">Loading posts, please wait...</p>
        ) : (
          posts.length === 0 ? (
            <p>No posts found!</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="post">
                <Link to={`/recipe/${post._id}`} className="post-link">
                  <img src={post.Images} alt={post.RecipeName} />
                  <h3>{post.RecipeName}</h3>
                  <p>{post.Description}</p>
                </Link>
                <div className="post-info">
                  <span>{post.Category}</span>
                  <span>by {post.Author} | {post.ReadTime} | {post.Comments}</span>
                </div>
                <button className="read-more">
                  <Link to={`/recipe/${post._id}`}>Read More</Link>
                </button>
                {showWishlist && (
                  <div
                    className={`wishlist-icon1 ${isInWishlist(post._id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(post)}
                  >
                    <i className={`bi ${isInWishlist(post._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  </div>
                )}
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default FeaturePosts;
