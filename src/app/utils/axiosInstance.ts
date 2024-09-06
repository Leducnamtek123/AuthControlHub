import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import authService from '../auth/services/auth.service';
import { logout } from '../redux/slices/auth.slices';

const API_URL = 'http://localhost:5165/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getCookie('user'); // Lấy cookie 'user'

    if (user) {
      try {
        const parsedUser = JSON.parse(user as string); // Parse cookie nếu có
        if (parsedUser?.accessToken) {
          // Thêm accessToken vào headers
          config.headers['Authorization'] = `Bearer ${parsedUser.accessToken}`;
        }
      } catch (error) {
        console.error('Error parsing user cookie:', error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Gọi API refresh token
        const refreshResponse = await authService.refreshToken();
        console.log(refreshResponse);
        if (refreshResponse.data && refreshResponse.data.accessToken) {
          // Cập nhật token mới vào cookie hoặc localStorage
          setCookie(
            'user',
            JSON.stringify({ accessToken: refreshResponse.data.accessToken })
          );

          // Cập nhật token mới cho request hiện tại
          error.config.headers[
            'Authorization'
          ] = `Bearer ${refreshResponse.data.accessToken}`;

          // Thử lại request ban đầu với token mới
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.error('Không thể refresh token:', refreshError);
        // Xử lý khi refresh token thất bại, ví dụ: đăng xuất người dùng
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
