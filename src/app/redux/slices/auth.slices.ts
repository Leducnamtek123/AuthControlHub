import { LoginRequest, RegisterRequest, UserLoginResponse } from '@/@types';
import authService from '@/app/auth/services/auth.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: UserLoginResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserLoginResponse>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export const loginAsync =
  (credentials: LoginRequest) => async (dispatch: any) => {
    dispatch(loginStart());
    try {
      const user = await authService.login(credentials);
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };
export const signUp =
  (credentials: RegisterRequest) => async (dispatch: any) => {
    try {
      const response = await authService.signUp(credentials);
      dispatch(loginSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };
export default authSlice.reducer;
