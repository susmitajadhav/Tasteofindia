// src/utils.js

// Function to format the dietType to handle singular/plural and case-insensitivity
export const formatQuery = (dietType) => {
    const singular = dietType.toLowerCase().trim().replace(/[-\s]+/g, '_'); // Replace spaces and dashes with underscores
    const plural = singular + 's'; // Assume plural by adding 's'
  
    return { singular, plural };
  };
  