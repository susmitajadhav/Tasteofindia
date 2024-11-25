import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';  // Import the Redux store

const container = document.getElementById('root');
const root = createRoot(container);  // Create the root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
