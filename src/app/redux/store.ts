import { configureStore } from '@reduxjs/toolkit';
import authReducer  from './slices/auth.slices';
import userReducer from './slices/user.slices';


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
