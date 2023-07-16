import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { userLoggedOut } from '../auth/authSlice';

const baseUrl = `http://localhost:5000/api/v1/`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const responseStatus = result.error.status;
    if (responseStatus === 401) {
      // Unauthorized (Not logged in)
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery(
            { credentials: 'include', url: 'auth/refresh-token' },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            // Retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(userLoggedOut());
            window.location.href = '/login';
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }

  return result;
};

export default customFetchBase;
