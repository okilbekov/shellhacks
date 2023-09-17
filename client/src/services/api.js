// src/services/api.js

import axios from 'axios';

// Set up base URL
const instance = axios.create({
	baseURL: "http://localhost:3001"
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
	// Do something before request is sent, e.g., add JWT if available
	const token = localStorage.getItem('token');
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
}, (error) => {
	// Handle request error here
	console.error("Error during request:", error);
	return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
	// Any status code that falls outside the range of 2xx causes this function to trigger
	// Do something with response data
	return response;
}, (error) => {
	// Handle response error here
	console.error("Error during response:", error);
	return Promise.reject(error);
});

export default instance;
