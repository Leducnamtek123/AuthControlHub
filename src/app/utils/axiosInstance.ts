// utils/axiosInstance.ts
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const API_URL = 'http://localhost:5165/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshToken = async () => {
  try {
    const user = getCookie('user');
    if (user) {
      const parsedUser = JSON.parse(user as string);
      const response = await axios.post(`${API_URL}auth/refresh`, {
        refreshToken: parsedUser.refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      const updatedUser = {
        ...parsedUser,
        accessToken,
        refreshToken: newRefreshToken,
      };
      setCookie('user', JSON.stringify(updatedUser));
      return accessToken;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

// Function to check if token is expired
const isTokenExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Assume token is expired if there's an error
  }
};

// Interceptor để thêm token vào header và refresh token nếu cần
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = getCookie('user');

    if (user) {
      const parsedUser = JSON.parse(user as string);
      if (parsedUser?.accessToken) {
        if (isTokenExpired(parsedUser.accessToken)) {
          // Token đã hết hạn, refresh token
          const newAccessToken = await refreshToken();
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        } else {
          config.headers['Authorization'] = `Bearer ${parsedUser.accessToken}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Xử lý lỗi refresh token (ví dụ: đăng xuất người dùng)
        console.error('Failed to refresh token:', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
