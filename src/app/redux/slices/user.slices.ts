import { BaseResponse, UserRequest } from '@/@types';
import userService from '@/app/account/services/user.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: UserRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Thunk for fetching users
export const fetchUsersAsync = createAsyncThunk(
  'user/fetchUsers',
  async (params: { pageIndex: number, pageSize: number }, { rejectWithValue }) => {
    try {
      const response: BaseResponse<UserRequest[]> = await userService.getUsers(params.pageIndex, params.pageSize);
      if (response.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(response.errors || 'Failed to fetch users');
      }
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// Thunk for adding a user
export const addUserAsync = createAsyncThunk(
  'user/addUser',
  async (userData: UserRequest, { rejectWithValue }) => {
    try {
      const response: BaseResponse<UserRequest> = await userService.addUser(userData);
      if (response.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(response.errors || 'Failed to add user');
      }
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// Thunk for updating a user
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<UserRequest>, { rejectWithValue }) => {
    try {
      const response: BaseResponse<UserRequest> = await userService.updateUser(userData.id!, userData);
      if (response.isSuccess) {
        return response.data;
      } else {
        return rejectWithValue(response.errors || 'Failed to update user');
      }
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

// Thunk for deleting a user
export const deleteUserAsync = createAsyncThunk(
  'user/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response: BaseResponse<null> = await userService.deleteUser(userId);
      if (response.isSuccess) {
        return userId;
      } else {
        return rejectWithValue(response.errors || 'Failed to delete user');
      }
    } catch (error: any) {
      return rejectWithValue('An unexpected error occurred. Please try again.');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.users = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users cases
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action: PayloadAction<UserRequest[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Add User cases
      .addCase(addUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAsync.fulfilled, (state, action: PayloadAction<UserRequest>) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Update User cases
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action: PayloadAction<UserRequest>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      // Delete User cases
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
