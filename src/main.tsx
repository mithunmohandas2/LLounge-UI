import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { Provider } from 'react-redux'
import Store from './app/store.ts'
import axios from 'axios';
import toast from 'react-hot-toast'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');    // Check if a token exists in local storage
    if (token) {      // If token exists, set it as an Authorization header
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {     // Handle any request errors
    return Promise.reject(error);
  }
);


axios.interceptors.response.use(    // To handle errors globally
  response => {
    return response;    // request success
  },
  error => {
    // Check for specific error status codes or other conditions
    console.error('Error:', error.response?.data?.message || error.message);                 // Other Errors
    return toast.error(error.response?.data?.message || error.message)
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
