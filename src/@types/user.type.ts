import { Role } from '@/app/account/@types';

export interface UserResponse {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: Role[];
}
export interface UserRequest {
  id?: string;
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}
