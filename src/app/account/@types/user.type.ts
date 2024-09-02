import { FilterBase } from "@/@types";

export interface UserResponse {
    email: string;
    password: string;
    username:string;
    phoneNumber:string;
}
export interface UserFilter extends FilterBase {
}
