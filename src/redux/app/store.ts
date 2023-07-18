import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const accessToken = localStorage.getItem('accessToken');
const decoded = accessToken
  ? jwtDecode<{ email: string; name: string }>(accessToken)
  : null;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  preloadedState: {
    auth: {
      name: decoded ? decoded.name : null,
      email: decoded ? decoded.email : null,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
