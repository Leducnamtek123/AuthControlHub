import { FilterBase } from '@/@types/filter.type';
import { Permission } from './permission.type';

export interface Role {
  name: string;
  description: string;
  permission: Permission[];
}
export interface RoleFilter extends FilterBase {}
