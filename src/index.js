import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Import your global CSS file
import App from './App';  // Import the main App component

// Render the App component into the root element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // This matches the div id in index.html
);
