// src/services/authService.js

import instance from './api';

const authService = {

  // Login user
  async login(credentials) {
    try {
      const response = await instance.post('/api/login', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("response.data");
      if (response.data && response.data.token) {
        console.log("setting token")
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  async signup(data) {
    try {
      const response = await instance.post('/api/users/register', data);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout() {
    // Remove the token from local storage
    localStorage.removeItem('token');
  },

  // Fetch current user's details
  async fetchCurrentUser() {
    try {
      console.log('fetchCurrentUser');
      const response = await instance.get('/api/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

};

export default authService;
