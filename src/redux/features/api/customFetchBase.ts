import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { userLoggedOut } from '../auth/authSlice';

const baseUrl = 'https://book-catalog-backend-lac.vercel.app/api/v1/';
// const baseUrl = 'http://localhost:5000/api/v1/';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
});

interface RefreshResponse {
  accessToken: string;
}

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (!(result?.data as any)?.success) {
    const responseMessage = (result?.data as any)?.message;
    if (
      responseMessage &&
      responseMessage.toLowerCase().includes('jwt expired')
    ) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery(
            { credentials: 'include', url: 'auth/refresh-token' },
            api,
            extraOptions
          );

          // Use the RefreshResponse type for refreshResult.data
          if (
            refreshResult.data &&
            (refreshResult.data as RefreshResponse).accessToken
          ) {
            localStorage.setItem(
              'accessToken',
              (refreshResult.data as RefreshResponse).accessToken
            );
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(userLoggedOut());
            window.location.href = '/login';
          }
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
