import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, cartAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const cachedUser = localStorage.getItem('auth_user');

    if (token && cachedUser) {
      try {
        // Restore user from localStorage immediately
        const parsedUser = JSON.parse(cachedUser);
        setUser(parsedUser);
        // Try to refresh user data in background (don't block UI)
        refreshUser();
      } catch (error) {
        // Invalid cache, try to fetch fresh
        fetchUser();
      }
    } else if (token) {
      // Token exists but no cached user, fetch from API
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authAPI.getUser();
      setUser(response.user);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    } catch (error) {
      // If we can't verify user, but have a token, don't log out
      // This prevents logout on network issues
      if (error.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setUser(null);
      } else {
        console.warn('Failed to verify user session:', error.message);
        // Keep existing user state if we have it, otherwise set null
        if (!user) {
          setUser(null);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getUser();
      if (response.user) {
        setUser(response.user);
        localStorage.setItem('auth_user', JSON.stringify(response.user));
      }
    } catch (error) {
      // Silently fail refresh, keep existing user data
      console.warn('Could not refresh user data:', error.message);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Continue logout even if API fails
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
