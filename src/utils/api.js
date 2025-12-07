// API utility functions using native fetch
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8082/api';

// In-memory cache for API responses
const cache = new Map();

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

const apiRequest = async (endpoint, options = {}, retries = 1) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    cache: 'no-cache', // Prevent browser HTTP caching
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, config);
      return handleResponse(response);
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      // Minimal wait for retry
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};

// Set token
export const setToken = (token) => localStorage.setItem('auth_token', token);

// Remove token
export const removeToken = () => localStorage.removeItem('auth_token');

// Get stored token
export const getToken = () => localStorage.getItem('auth_token');

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
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams(params);
    const cacheKey = `products_${searchParams.toString()}`;

    // Check cache first - return cached data if available (even empty arrays to avoid repeated failed requests)
    if (cache.has(cacheKey)) {
      return Promise.resolve(cache.get(cacheKey));
    }

    const data = await apiRequest(`/products?${searchParams}`);
    // Cache result (including empty arrays to prevent repeated requests)
    cache.set(cacheKey, data);
    return data;
  },

  getById: async (id) => {
    const cacheKey = `product_${id}`;
    if (cache.has(cacheKey)) {
      return Promise.resolve(cache.get(cacheKey));
    }

    const data = await apiRequest(`/products/${id}`);
    if (data) {
      cache.set(cacheKey, data);
    }
    return data;
  },

  getSuggestions: async (categoryName, excludeId, limit = 4) => {
    const cacheKey = `suggestions_${categoryName}_${excludeId}_${limit}`;
    if (cache.has(cacheKey)) {
      return Promise.resolve(cache.get(cacheKey));
    }

    // Use category filter with limit to fetch only what we need from server
    const data = await apiRequest(`/products?category=${encodeURIComponent(categoryName)}&limit=${limit + 1}`);
    const suggestions = data.filter(product => product.id !== excludeId).slice(0, limit);

    cache.set(cacheKey, suggestions);
    return suggestions;
  },
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
