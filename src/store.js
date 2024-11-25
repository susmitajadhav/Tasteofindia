import { configureStore } from '@reduxjs/toolkit';
import someReducer from './someReducer';  // Import your reducer

const store = configureStore({
  reducer: {
    someState: someReducer,  // Make sure to pass a valid reducer here
  },
});

export default store;
