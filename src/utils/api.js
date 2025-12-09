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
    let errorMessage = 'API request failed';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.email || errorMessage;
    } catch (e) {
      errorMessage = 'Network error';
    }
    throw new ApiError(errorMessage, response.status);
  }

  return response.json();
};

const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('auth_token');
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...(data && { body: JSON.stringify(data) }),
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  register: (userData) => apiRequest('/register', 'POST', userData),
  login: (credentials) => apiRequest('/login', 'POST', credentials),
  logout: () => apiRequest('/logout', 'POST'),
  getUser: () => apiRequest('/user'),
};

// Product API functions
export const productsAPI = {
  getAll: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    return apiRequest(`/products?${searchParams}`);
  },
  getById: (id) => apiRequest(`/products/${id}`),
  create: (productData) => apiRequest('/products', 'POST', productData),
  update: (id, productData) => apiRequest(`/products/${id}`, 'PATCH', productData),
  delete: (id) => apiRequest(`/products/${id}`, 'DELETE'),
  getSuggestions: async (categoryName, excludeId, limit = 4) => {
    try {
      const data = await apiRequest(`/products?category=${encodeURIComponent(categoryName)}&limit=${limit + 1}`);
      const suggestions = data.filter(product => product.id !== excludeId).slice(0, limit);
      return suggestions;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  },
};

// Category API functions
export const categoriesAPI = {
  getAll: () => apiRequest('/categories'),
  getById: (id) => apiRequest(`/categories/${id}`),
};

// Cart API functions
export const cartAPI = {
  getAll: () => apiRequest('/cart'),
  addItem: (product_id, quantity) => apiRequest('/cart', 'POST', { product_id, quantity }),
  updateItem: (cartId, quantity) => apiRequest(`/cart/${cartId}`, 'PATCH', { quantity }),
  removeItem: (cartId) => apiRequest(`/cart/${cartId}`, 'DELETE'),
};

// Orders API functions
export const ordersAPI = {
  getAll: () => apiRequest('/orders'),
  create: (orderData) => apiRequest('/orders', 'POST', orderData),
  getById: (id) => apiRequest(`/orders/${id}`),
};

export default apiRequest;
