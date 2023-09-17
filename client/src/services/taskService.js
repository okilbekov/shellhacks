// src/services/taskService.js

import api from './api';

const taskService = {

  // Fetch all tasks for the current user
  async fetchTasks() {
    try {
      const response = await api.get('/api/tasks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch a specific task by ID
  async fetchTaskById(taskId) {
    try {
      const response = await api.get(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new task
  async createTask(taskData) {
    try {
      const response = await api.post('/api/tasks', taskData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update an existing task
  async updateTask(taskId, updatedData) {
    try {
      const response = await api.put(`/api/tasks/${taskId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a task by ID
  async deleteTask(taskId) {
    try {
      const response = await api.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

};

export default taskService;
