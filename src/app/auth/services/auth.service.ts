import { LoginRequest, RegisterRequest, UserLoginResponse } from '@/@types';
import axios from 'axios';

const API_URL = 'http://localhost:5165/Auth'; // API URL for authentication

// Create an axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Send login request to API
const login = async (credentials: LoginRequest): Promise<UserLoginResponse> => {
  try {
    const response = await apiClient.post<UserLoginResponse>(
      '/login',
      credentials
    );
    const user = response.data;
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user)); // Store user info in localStorage
    return user;
  } catch (error: any) {
    throw new Error(
      'Login failed: ' + (error.response?.data?.message || error.message)
    );
  }
};

// Send logout request to API
const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/logout');
    localStorage.removeItem('user'); // Remove user info from localStorage
  } catch (error: any) {
    throw new Error(
      'Logout failed: ' + (error.response?.data?.message || error.message)
    );
  }
};

const signUp = async (credentials: RegisterRequest): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(
      'Register failed: ' + (error.response?.data?.message || error.message)
    );
  }
};
const authService = {
  login,
  logout,
  signUp,
};

export default authService;
