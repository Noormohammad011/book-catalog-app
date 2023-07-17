import { apiSlice } from '../api/apiSlice';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('accessToken');

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({
        page = 1,
        limit = 10,
        genre,
        fromDate,
        toDate,
        searchTerm,
      }) => ({
        url: `/book`,
        method: 'GET',
        params: {
          page,
          limit,
          genre,
          fromDate,
          toDate,
          searchTerm,
        },
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: 'Book',
                id,
              })),
              { type: 'Book', id: 'LIST' },
            ]
          : [{ type: 'Book', id: 'LIST' }],
    }),

    getBookById: builder.query({
      query: (id: string) => `/book/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'Book', id: result.data.id }] : [],
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
          return [{ type: 'Book', id: result.id }];
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
        if (!error) {
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
