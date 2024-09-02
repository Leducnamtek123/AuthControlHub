import { BaseResponse, UserRequest, UserResponse } from '@/@types';
import axios from 'axios';

const API_URL = 'http://localhost:5165/users'; // Updated URL to be specific to user endpoints

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch users with pagination
const getUsers = async (pageIndex: number, pageSize: number): Promise<BaseResponse<UserResponse[]>> => {
  const response = await apiClient.get<BaseResponse<UserResponse[]>>(`?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  return response.data;
};

// Add a new user
const addUser = async (userData: UserRequest): Promise<BaseResponse<UserResponse>> => {
  const response = await apiClient.post<BaseResponse<UserResponse>>('/', userData);
  return response.data;
};

// Update an existing user
const updateUser = async (userId: string, userData: Partial<UserRequest>): Promise<BaseResponse<UserResponse>> => {
  const response = await apiClient.put<BaseResponse<UserResponse>>(`/${userId}`, userData);
  return response.data;
};

// Delete a user
const deleteUser = async (userId: string): Promise<BaseResponse<null>> => {
  const response = await apiClient.delete<BaseResponse<null>>(`/${userId}`);
  return response.data;
};

const userService = {
  getUsers,
  addUser,
  updateUser,
  deleteUser
};

export default userService;
