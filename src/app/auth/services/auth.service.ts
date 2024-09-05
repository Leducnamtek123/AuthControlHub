// services/auth.service.ts
import {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  UserResponse,
  BaseResponse,
} from '@/@types';
import apiClient from '@/app/utils/axiosInstance'; // Import the Axios instance
import { setCookie, deleteCookie } from 'cookies-next';

const login = async (
  credentials: LoginRequest
): Promise<BaseResponse<LoginResponse>> => {
  // Post the login request and specify that the response is a BaseResponse<LoginResponse>
  const response = await apiClient.post<BaseResponse<LoginResponse>>(
    '/auth/login',
    credentials
  );
  console.log(response.data);
  // Save the user data to cookie when login is successful
  if (response.data.isSuccess) {
    setCookie('user', JSON.stringify(response.data.data));
  }
  return response.data;
};

const logout = async (): Promise<void> => {
  await apiClient.post('auth/logout', {}); // Gửi một object rỗng thay vì 'string'
  deleteCookie('user'); // Remove the user data from cookie
};

const signUp = async (
  credentials: RegisterRequest
): Promise<BaseResponse<LoginResponse>> => {
  // Post the sign up request and specify that the response is a BaseResponse<LoginResponse>
  const response = await apiClient.post<BaseResponse<LoginResponse>>(
    'auth/register',
    credentials
  );
  return response.data;
};

const getUserDetails = async (): Promise<BaseResponse<UserResponse>> => {
  const response = await apiClient.get<BaseResponse<UserResponse>>(
    'auth/manage/info'
  );
  return response.data;
};

const refreshToken = async (): Promise<BaseResponse<LoginResponse>> => {
  const response = await apiClient.post<BaseResponse<LoginResponse>>(
    'auth/refresh'
  );
  if (response.data.isSuccess) {
    setCookie('user', JSON.stringify(response.data.data));
  }
  return response.data;
};

const authService = {
  login,
  logout,
  signUp,
  getUserDetails,
  refreshToken,
};

export default authService;
