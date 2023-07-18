// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBase,
  tagTypes: ['Book', 'User', 'Review'],
  endpoints: () => ({}),
});
