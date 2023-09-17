// src/services/taskService.js

import api from './api';

const taskService = {

  // Fetch all tasks for the current user
  async fetchTasks() {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fetch a specific task by ID
  async fetchTaskById(taskId) {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new task
  async createTask(taskData) {
    try {
      const response = await api.post('/tasks', taskData, {
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
      const response = await api.put(`/tasks/${taskId}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a task by ID
  async deleteTask(taskId) {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

};

export default taskService;
