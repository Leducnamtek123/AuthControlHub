// utils/axiosInstance.ts
import axios from 'axios';

const API_URL = 'http://localhost:5165/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');

    // Kiểm tra nếu tồn tại `accessToken` trước khi thêm vào header
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser?.accessToken) {
        config.headers['Authorization'] = `Bearer ${parsedUser.accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;
