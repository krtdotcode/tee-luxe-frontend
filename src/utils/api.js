// API utility functions using native fetch
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new ApiError(errorData.message || 'API request failed', response.status);
  }

  return response.json();
};

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  return handleResponse(response);
};

// Get stored token
const getToken = () => localStorage.getItem('auth_token');

// Set token
export const setToken = (token) => localStorage.setItem('auth_token', token);

// Remove token
export const removeToken = () => localStorage.removeItem('auth_token');

// Create authenticated request
const authRequest = async (endpoint, options = {}) => {
  const token = getToken();
  if (!token) {
    throw new ApiError('No authentication token found', 401);
  }

  return apiRequest(endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  });
};

// Product API functions
export const productsAPI = {
  getAll: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiRequest(`/products?${searchParams}`);
  },

  getById: (id) => apiRequest(`/products/${id}`),
};

// Category API functions
export const categoriesAPI = {
  getAll: () => apiRequest('/categories'),
  getById: (id) => apiRequest(`/categories/${id}`),
};

// Auth API functions
export const authAPI = {
  register: (userData) => apiRequest('/register', 'POST', userData),
  login: (credentials) => apiRequest('/login', 'POST', credentials),
  logout: () => authRequest('/logout', 'POST'),
  getUser: () => authRequest('/user'),
};

// Cart API functions
export const cartAPI = {
  getAll: () => authRequest('/cart'),
  addItem: (product_id, quantity) => authRequest('/cart', 'POST', { product_id, quantity }),
  updateItem: (cartId, quantity) => authRequest(`/cart/${cartId}`, 'PATCH', { quantity }),
  removeItem: (cartId) => authRequest(`/cart/${cartId}`, 'DELETE'),
};

export default apiRequest;
