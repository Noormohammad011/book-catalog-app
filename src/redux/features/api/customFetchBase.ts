import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { userLoggedIn, userLoggedOut } from '../auth/authSlice';
import { RootState } from '../../app/store';
import jwtDecode from 'jwt-decode';

const baseUrl = 'https://book-catalog-backend-lac.vercel.app/api/v1/';
// const baseUrl = 'http://localhost:5000/api/v1/';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const success = (result as { data: { success: boolean } })?.data?.success;
  if (!(success as boolean)) {
    const responseMessage =
      (result as { error: { data: { message: string } } })?.error?.data?.message
        ?.toLowerCase()
        ?.includes('jwt expired') ||
      (result as { error: { data: { message: string } } })?.error?.data?.message
        ?.toLowerCase()
        ?.includes('Invalid token') ||
      (result as { error: { data: { message: string } } })?.error?.data?.message
        ?.toLowerCase()
        ?.includes('Unauthorized') ||
      (result as { error: { status: number } })?.error?.status === 401;

    if (responseMessage) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery(
            {
              method: 'POST',
              credentials: 'include',
              url: 'auth/refresh-token',
            },
            api,
            extraOptions
          );
          const accessToken = (
            refreshResult as { data: { data: { accessToken: string } } }
          )?.data?.data?.accessToken;

          if (accessToken) {
            const decode = jwtDecode<{ email: string; name: string }>(
              accessToken
            );
            api.dispatch(
              userLoggedIn({
                name: decode.name,
                email: decode.email,
                accessToken: accessToken,
              })
            );
            localStorage.setItem('accessToken', accessToken);
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(userLoggedOut());
            window.location.href = '/login';
          }
        } catch (error) {
          api.dispatch(userLoggedOut());
          window.location.href = '/login';
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};

export default customFetchBase;
