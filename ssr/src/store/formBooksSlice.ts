import { FormCardData } from './../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormBookState {
  formBooks: FormCardData[];
}

const initialState: FormBookState = {
  formBooks: [],
};

const formBookSlice = createSlice({
  name: 'formBooks',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<FormCardData>) {
      state.formBooks.push(action.payload);
    },
  },
});

export const formBooksActions = formBookSlice.actions;

export default formBookSlice.reducer;
