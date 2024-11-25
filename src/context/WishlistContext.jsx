import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (recipe) => {
    setWishlistItems((prevWishlist) => [...prevWishlist, recipe]);
  };

  const removeFromWishlist = (recipeId) => {
    setWishlistItems((prevWishlist) => prevWishlist.filter(item => item.id !== recipeId));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
