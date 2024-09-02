export interface UserResponse {
    email: string;
    password: string;
    username:string;
    phoneNumber:string;
}
export interface UserRequest {
    id?:string;
    email: string;
    password: string;
    username:string;
    phoneNumber:string;
}
