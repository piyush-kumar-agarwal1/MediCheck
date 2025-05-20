import axiosOriginal from 'axios';
import { API_BASE_URL } from '@/config/api';

// Create a custom instance of axios with default config
export const axios = axiosOriginal.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to automatically add auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access - could redirect to login
      console.error('Unauthorized access. Please log in again.');
      // Consider adding this functionality to redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;