import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
  books: [];
}

// Define the initial state using that type
const initialState: CounterState = {
  books: [],
};

export const bookSlice = createSlice({
  name: 'book',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
