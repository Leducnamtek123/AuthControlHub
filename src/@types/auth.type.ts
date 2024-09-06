import { User } from '@/app/account/@types';
import { UserResponse } from './user.type';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface UserInfo {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface AuthData {
  user: User;
  userResponse: UserResponse;
  accessToken: string;
}
