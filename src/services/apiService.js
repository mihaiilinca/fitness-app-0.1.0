// src/services/apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3015'; // Replace with your API endpoint

export const getExercises = () => axios.get(`${BASE_URL}/fitness/exercises`);
export const getFood = () => axios.get(`${BASE_URL}/fitness/food`);
// Add more API requests as needed
