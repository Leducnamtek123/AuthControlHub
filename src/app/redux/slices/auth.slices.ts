// slices/authSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginRequest, RegisterRequest, LoginResponse, UserResponse } from '@/@types';
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
      console.error("Login error:", error);
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
      const response = await authService.getUserDetails(); // Call the new service method
      if (response.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(response.errors || 'Failed to fetch user details');
      }
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null; 
      // Remove tokens from localStorage
      localStorage.removeItem('user');
      
    },
    setUserFromLocalStorage: (state, action: PayloadAction<UserResponse>) => {
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
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchUserDetailsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetailsAsync.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetailsAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { logout, setUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
