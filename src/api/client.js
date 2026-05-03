import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Mock logged-in user ID for demonstration purposes
export const CURRENT_USER_ID = 1;

export default api;
