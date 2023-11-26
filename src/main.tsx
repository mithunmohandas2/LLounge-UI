import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { Provider } from 'react-redux'
import Store from './app/store.ts'
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {      // If a token exists, set it as an Authorization header
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {     // Handle any request errors
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
