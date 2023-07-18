import jwtDecode from 'jwt-decode';
import { LoginInput } from '../../../pages/Login';
import { RegisterInput } from '../../../pages/Signup';
import { apiSlice } from '../api/apiSlice';
import { IAuthResponse, IUserResponse } from '../api/type';
import { userLoggedIn } from './authSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUserResponse, RegisterInput>({
      query(data) {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<IAuthResponse, LoginInput>({
      query(data) {
        return {
          url: 'auth/login',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: IAuthResponse): IAuthResponse => {
        if (response.data) {
          localStorage.setItem('accessToken', response?.data?.accessToken);
        }
        return response;
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const decoded: {
            email: string;
            name: string;
          } = jwtDecode(data?.data?.accessToken);

          dispatch(
            userLoggedIn({
              name: decoded.name,
              email: decoded.email,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    userProfile: builder.query<IUserResponse, void>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['User'],
    }),
    createWishList: builder.mutation({
      query: (bookId: string) => ({
        url: `auth/wishlist`,
        method: 'POST',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        body: bookId,
      }),
      // invalidatesTags: [
      //   { type: 'Book', id: 'ALL' },
      //   { type: 'User', id: 'ALL' },
      // ],
    }),
    deleteWishList: builder.mutation({
      query: (bookId: string) => ({
        url: `auth/wishlist/${bookId}`,
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      }),
      // invalidatesTags: [
      //   { type: 'Book', id: 'ALL' },
      //   { type: 'User', id: 'ALL' },
      // ],
    }),
    createReadingList: builder.mutation({
      query: ({ bookId, status }: { bookId: string; status: string }) => ({
        url: `auth/readinglist`,
        method: 'POST',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        body: {
          bookId,
          status,
        },
      }),
      // invalidatesTags: [
      //   { type: 'Book', id: 'ALL' },
      //   { type: 'User', id: 'ALL' },
      // ],
    }),
    updateReadingList: builder.mutation({
      query: ({ bookId, status }: { bookId: string; status: string }) => ({
        url: `auth/readinglist`,
        method: 'PATCH',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        body: {
          bookId,
          status,
        },
      }),
      invalidatesTags: [
        { type: 'Book', id: 'ALL' },
        { type: 'User', id: 'ALL' },
      ],
    }),
    createReview: builder.mutation({
      query: ({ bookId, comment }: { bookId: string; comment: string }) => ({
        url: `/reviews`,
        method: 'POST',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        body: {
          bookId,
          comment,
        },
      }),
      invalidatesTags: ['Review'],
    }),
    getReviewsById: builder.query({
      query: (bookID: string) => ({
        url: `/reviews/${bookID}`,
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUserProfileQuery,
  useCreateWishListMutation,
  useDeleteWishListMutation,
  useCreateReadingListMutation,
  useUpdateReadingListMutation,
  useCreateReviewMutation,
  useGetReviewsByIdQuery,
} = authApi;
