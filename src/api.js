import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your API URL
});

// Set the default header for all requests
api.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export default api;
