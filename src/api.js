// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_DEPLOY,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
