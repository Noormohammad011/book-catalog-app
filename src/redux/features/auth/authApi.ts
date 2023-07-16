import { apiSlice } from '../api/apiSlice';
import { IAuthResponse, IUserResponse } from '../api/type';
import Cookies from 'js-cookie';
import { LoginInput } from '../../../pages/Login';
import { RegisterInput } from '../../../pages/Signup';
import jwtDecode from 'jwt-decode';
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
          Cookies.set('accessToken', response?.data?.accessToken, {
            expires: 7,
          });
        }
        return response;
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
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
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
