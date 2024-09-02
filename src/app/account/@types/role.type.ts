import { FilterBase } from "@/@types";

export interface RoleResponse {
    email: string;
    password: string;
    username: string;
    phoneNumber: string;
}
export interface RoleFilter
    extends FilterBase { }
