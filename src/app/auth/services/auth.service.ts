// services/auth.service.ts
import {
  LoginRequest,
  RegisterRequest,
  LoginData,
  UserResponse,
  BaseResponse,
  RefreshTokenResponse,
  RegisterData,
} from '@/@types';
import apiClient from '@/app/utils/axiosInstance'; // Import the Axios instance
import { setCookie, deleteCookie } from 'cookies-next';

const login = async (
  credentials: LoginRequest
): Promise<BaseResponse<LoginData>> => {
  // Post the login request and specify that the response is a BaseResponse<LoginData>
  const response = await apiClient.post<BaseResponse<LoginData>>(
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
): Promise<BaseResponse<RegisterData>> => {
  // Post the sign up request and specify that the response is a BaseResponse<LoginData>
  const response = await apiClient.post<BaseResponse<RegisterData>>(
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

const refreshToken = async (): Promise<BaseResponse<RefreshTokenResponse>> => {
  const response = await apiClient.post<BaseResponse<RefreshTokenResponse>>(
    'auth/refresh'
  );
  if (response.data.isSuccess) {
    setCookie('user', JSON.stringify(response.data.data));
  }
  console.log(response.data);
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
