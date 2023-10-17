// api.js

import axios from 'axios';

const API_BASE_URL = 'https://tipsybackend.onrender.com'; // Update with your Rails API URL

// Create an instance of Axios with custom configuration if needed
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define functions to make API requests
export const getBars = () => {
  return axiosInstance.get('/bars');
}
  export const createBar = (barData) => {
    return axiosInstance.post('/bars', barData);
};
export const getBarById = (id) => {
    return axiosInstance.get(`/bars/${id}`);
};

export const updateBar = (barData) => {
    return axiosInstance.put(`/bars/${barData.id}`, barData);
  };

  export const deleteBar = (id) => {
    return axiosInstance.delete(`/bars/${id}`);
  }

// Add more functions for other API endpoints as needed