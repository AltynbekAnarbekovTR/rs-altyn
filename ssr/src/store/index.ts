// import pkg from '@reduxjs/toolkit';
// const { configureStore } = pkg;

import * as toolkitRaw from '@reduxjs/toolkit';
const { configureStore } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

// import { configureStore } from '@reduxjs/toolkit';
import homeBooksSlice from './booksSlice';
import formBookSlice from './formBooksSlice';

const store = configureStore({
  reducer: { homeBooks: homeBooksSlice, formBooks: formBookSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
