// API Service - Backend ile iletişim için

const API_BASE_URL = 'http://localhost:3000';

class ApiService {
  async request(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health Check
  async getHealth() {
    return await this.request('/health');
  }

  // API Status
  async getStatus() {
    return await this.request('/api/status');
  }

  // User API
  async getUserProfile() {
    return await this.request('/api/users/profile');
  }

  // Courses API
  async getCourses() {
    return await this.request('/api/courses/');
  }

  // Auth API
  async login(email, password) {
    return await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(userData) {
    return await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }
}

export default new ApiService();