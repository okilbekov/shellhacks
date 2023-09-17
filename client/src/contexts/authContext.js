// src/contexts/authContext.js

import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await authService.fetchCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoadingAuthState(false);
      }
    };

    if (localStorage.getItem('token')) {
      fetchCurrentUser();
    } else {
      setLoadingAuthState(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      console.log("login in authContext.js");
      const userData = await authService.login(credentials);
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (data) => {
    try {
      const userData = await authService.signup(data);
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loadingAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;