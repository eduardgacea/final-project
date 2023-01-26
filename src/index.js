import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContextProvider from './Contexts/UserContext';
import TweetContextProvider from './Contexts/TweetContext';
import ThemeContextProvider from './Contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

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
