import { configureStore } from '@reduxjs/toolkit';
import homeBooksSlice from './booksSlice';
import formBookSlice from './formBooksSlice';

const store = configureStore({
  reducer: { homeBooks: homeBooksSlice, formBooks: formBookSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
