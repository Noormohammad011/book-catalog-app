// Need to use the React-specific entry point to import createApi
import { apiSlice } from '../api/apiSlice';

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => 'users',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllBooksQuery } = bookApi;
