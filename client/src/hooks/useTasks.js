// src/hooks/useTasks.js

import { useState, useEffect } from 'react';
import taskService from '../services/taskService';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError(err);
    }
  };

  // Update an existing task
  const updateTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, updatedData);
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (err) {
      setError(err);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError(err);
    }
  };

  // Initially fetch tasks when the hook is used
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
};

export default useTasks;
