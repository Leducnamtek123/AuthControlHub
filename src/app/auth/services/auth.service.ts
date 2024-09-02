// services/auth.service.ts
import { LoginRequest, RegisterRequest, LoginResponse, UserResponse, BaseResponse } from '@/@types';
import apiClient from '@/app/utils/axiosInstance'; // Import the Axios instance

const login = async (credentials: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  // Post the login request and specify that the response is a BaseResponse<LoginResponse>
  const response = await apiClient.post<BaseResponse<LoginResponse>>('/auth/login', credentials);
  console.log(response.data)
  // Save the user data to localStorage
  if (response.data.isSuccess) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data;
};


const logout = async (): Promise<void> => {
  await apiClient.post('auth/logout');
  localStorage.removeItem('user'); // Make sure the user data is removed from storage
};

const signUp = async (credentials: RegisterRequest): Promise<BaseResponse<LoginResponse>> => {
  // Post the sign up request and specify that the response is a BaseResponse<LoginResponse>
  const response = await apiClient.post<BaseResponse<LoginResponse>>('auth/register', credentials);
  return response.data;
};
const getUserDetails = async (): Promise<BaseResponse<UserResponse>> => {
  const response = await apiClient.get<BaseResponse<UserResponse>>('auth/manage/info');
  return response.data;
};

const authService = {
  login,
  logout,
  signUp,
  getUserDetails
};

export default authService;
