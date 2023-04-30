import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import homeBooksSlice from './store/booksSlice';
import formBooksSlice from './store/formBooksSlice';

const store = configureStore({
  reducer: { homeBooks: homeBooksSlice, formBooks: formBooksSlice },
  preloadedState: window.__PRELOADED_STATE__,
});

delete window.__PRELOADED_STATE__;

hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
