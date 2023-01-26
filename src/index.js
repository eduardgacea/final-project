import React from 'react';
import ReactDOM from 'react-dom/client';
import classes from './index.module.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './Contexts/UserContext/UserContext';
import TweetContextProvider from './Contexts/UserContext/TweetContext';
import ThemeContextProvider from './Contexts/UserContext/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <ThemeContextProvider>
        <TweetContextProvider>
          <App />
        </TweetContextProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
