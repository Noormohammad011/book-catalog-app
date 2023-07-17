import Cookies from 'js-cookie';
import { apiSlice } from '../api/apiSlice';

const accessToken = Cookies.get('accessToken');

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (params?: {
        page?: number;
        limit?: number;
        genre?: string;
        fromDate?: string;
        toDate?: string;
        searchTerm?: string;
        sortOrder?: string;
      }) => ({
        url: `/book`,
        method: 'GET',
        params: {
          ...params,
          limit: params?.limit || 10,
          page: params?.page || 1,
          sortOrder: params?.sortOrder || 'desc', // Fixed typo here
        },
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                // Use _id instead of id
                type: 'Book',
                id: _id,
              })),
              { type: 'Book', id: 'LIST' },
            ]
          : [{ type: 'Book', id: 'LIST' }],
    }),

    getBookById: builder.query({
      query: (id: string) => `/book/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'Book', id: result.data._id }] : [],
    }),

    createBook: builder.mutation({
      query: (body) => ({
        url: `/book`,
        method: 'POST',
        body,
        headers: {
          Authorization: accessToken,
        },
      }),

      invalidatesTags: [{ type: 'Book', id: 'LIST' }],
    }),

    updateBook: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/book/${id}`,
        method: 'PATCH',
        body: patch,
        headers: {
          Authorization: accessToken,
        },
      }),
      invalidatesTags: (result) => {
        if (result) {
          // If the mutation is successful, invalidate the cache for the updated book
          return [{ type: 'Book', id: result.data._id }];
        }
        return [];
      },
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
        },
      }),
      invalidatesTags: (error, id) => {
        if (!error && id) {
          const bookId = id?.toString();
          if (bookId) {
            return [{ type: 'Book', id: bookId }];
          }
        }
        return [];
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
