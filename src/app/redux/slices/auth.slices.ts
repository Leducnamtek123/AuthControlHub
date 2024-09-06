import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthData,
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from '@/@types';
import authService from '@/app/auth/services/auth.service';

interface AuthState {
  user: AuthData | null;
  userDetails: UserResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userDetails: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      if (response.isSuccess) {
        return response.data;
      }
      return rejectWithValue('Failed to get user details');
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authService.signUp(credentials);
      if (response.isSuccess) {
        return response.data;
      }
      return rejectWithValue('Failed to get user details');
    } catch (error) {
      return rejectWithValue('Sign up failed');
    }
  }
);

export const getUserDetails = createAsyncThunk(
  'auth/getUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getUserDetails();
      if (response.isSuccess) {
        return response.data;
      }
      return rejectWithValue('Failed to get user details');
    } catch (error) {
      return rejectWithValue('Failed to get user details');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();
      if (response.isSuccess) {
        return response.data;
      }
      return rejectWithValue('Failed to get user details');
    } catch (error) {
      return rejectWithValue('Token refresh failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.userDetails = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
