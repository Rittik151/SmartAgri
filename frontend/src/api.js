import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// http://localhost:5000/api
export const api = axios.create({
  baseURL: baseURL + '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

export default api;
