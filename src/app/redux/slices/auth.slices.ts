// slices/authSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  UserResponse,
} from '@/@types';
import authService from '@/app/auth/services/auth.service';

interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Thunk for login
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (response.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(response.errors || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// Thunk for signup
export const signUpAsync = createAsyncThunk(
  'auth/signUp',
  async (credentials: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(credentials);
      if (response.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(response.errors || 'Registration failed');
      }
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// Thunk for fetching user details
export const fetchUserDetailsAsync = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getUserDetails();
      if (response.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(
          response.errors || 'Failed to fetch user details'
        );
      }
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// Thunk for refreshing token
export const refreshTokenAsync = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();
      if (response.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(response.errors || 'Token refresh failed');
      }
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// Thunk for logout
export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred during logout.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserFromSession: (state, action: PayloadAction<UserResponse>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isAuthenticated = true;
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signUpAsync.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isAuthenticated = true;
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(signUpAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchUserDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserDetailsAsync.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.user = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserDetailsAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(refreshTokenAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        refreshTokenAsync.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              ...action.payload,
            };
          }
          state.loading = false;
        }
      )
      .addCase(refreshTokenAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setUserFromSession } = authSlice.actions;
export default authSlice.reducer;
