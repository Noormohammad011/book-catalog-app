import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUserState {
  name: string | null;
  email: string | null;
}

const initialState: IUserState = {
  name: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<IUserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    userLoggedOut: (state) => {
      state.name = null;
      state.email = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
