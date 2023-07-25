import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserState {
  name: string | null;
  email: string | null;
  accessToken: string | null;
}

const initialState: IUserState = {
  name: null,
  email: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<IUserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    userLoggedOut: (state) => {
      state.name = null;
      state.email = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
