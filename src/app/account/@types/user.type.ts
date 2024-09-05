import { FilterBase } from '@/@types/filter.type';
import { Role } from './role.type';

export interface User {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  role: Role[];
}
export interface UserRequest {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
export interface UserFilter extends FilterBase {}
