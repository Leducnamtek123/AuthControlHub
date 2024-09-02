import { FilterBase } from "@/@types";

export interface PermissionResponse {
    email: string;
    password: string;
    username:string;
    phoneNumber:string;
}
export interface PermissionFilter extends FilterBase {
}
