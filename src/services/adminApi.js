import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';


// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User Management API
export const userApi = {
  // Get users with pagination, filtering, and search
  getUsers: (params = {}) => {
    return apiClient.get('/admin/users', { params });
  },
  
  // Get a single user by ID
  getUser: (userId) => {
    return apiClient.get(`/admin/users/${userId}`);
  },
  
  // Create a new user
  createUser: (userData) => {
    return apiClient.post('/admin/users', userData);
  },
  
  // Update an existing user
  updateUser: (userId, userData) => {
    return apiClient.put(`/admin/users/${userId}`, userData);
  },
  
  // Delete a user
  deleteUser: (userId) => {
    return apiClient.delete(`/admin/users/${userId}`);
  }
};

// Request Management API
export const requestApi = {
  // Get all requests with pagination, filtering, and search
  getRequests: (params = {}) => {
    return apiClient.get('/admin/requests', { params });
  },
  
  // Get a single request by ID
  getRequest: (requestId) => {
    return apiClient.get(`/admin/requests/${requestId}`);
  },
  
  // Update request status
  updateRequestStatus: (requestId, status) => {
    return apiClient.patch(`/admin/requests/${requestId}/status`, { status });
  },
  
  // Assign collector to request
  assignCollector: (requestId, collectorId) => {
    return apiClient.patch(`/admin/requests/${requestId}/assign`, { collector_id: collectorId });
  },
  
  // Delete a request
  deleteRequest: (requestId) => {
    return apiClient.delete(`/admin/requests/${requestId}`);
  }
};

// Product Management API
export const productApi = {
  // Get all products with pagination, filtering, and search
  getProducts: (params = {}) => {
    return apiClient.get('/admin/products', { params });
  },
  
  // Get a single product by ID
  getProduct: (productId) => {
    return apiClient.get(`/admin/products/${productId}`);
  },
  
  // Create a new product
  createProduct: (productData) => {
    return apiClient.post('/admin/products', productData);
  },
  
  // Update an existing product
  updateProduct: (productId, productData) => {
    return apiClient.put(`/admin/products/${productId}`, productData);
  },
  
  // Delete a product
  deleteProduct: (productId) => {
    return apiClient.delete(`/admin/products/${productId}`);
  }
};

// Material Management API
export const materialApi = {
  // Get all materials
  getMaterials: () => {
    return apiClient.get('/admin/materials');
  },
  
  // Create a new material
  createMaterial: (materialData) => {
    return apiClient.post('/admin/materials', materialData);
  },
  
  // Update an existing material
  updateMaterial: (materialId, materialData) => {
    return apiClient.put(`/admin/materials/${materialId}`, materialData);
  },
  
  // Delete a material
  deleteMaterial: (materialId) => {
    return apiClient.delete(`/admin/materials/${materialId}`);
  }
};

// Category Management API
export const categoryApi = {
  // Get all categories (paginated)
  getCategories: (params = {}) => {
    return apiClient.get('/admin/categories', { params });
  },
  // Get a single category
  getCategory: (categoryId) => {
    return apiClient.get(`/admin/categories/${categoryId}`);
  },
  // Create category
  createCategory: (payload) => {
    return apiClient.post('/admin/categories', payload);
  },
  // Update category
  updateCategory: (categoryId, payload) => {
    return apiClient.put(`/admin/categories/${categoryId}`, payload);
  },
  // Delete category
  deleteCategory: (categoryId) => {
    return apiClient.delete(`/admin/categories/${categoryId}`);
  },
};

// Dashboard Management API
export const dashboardApi = {
  // Get dashboard statistics
  getStats: () => {
    return apiClient.get('/admin/dashboard/stats');
  },
  
  // Get recent activities
  getRecentActivities: () => {
    return apiClient.get('/admin/dashboard/activities');
  }
};

export default {
  userApi,
  requestApi,
  productApi,
  materialApi,
  categoryApi,
  dashboardApi
};