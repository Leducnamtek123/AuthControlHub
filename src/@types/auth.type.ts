export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
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
export interface RefreshTokenResponse {
  accessToken: string;
}
