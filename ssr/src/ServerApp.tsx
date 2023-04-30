import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { App } from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import homeBooksSlice, { fetchBooks } from './store/booksSlice';
import formBooksSlice from './store/formBooksSlice';

export async function renderApp(url: string, opts: RenderToPipeableStreamOptions) {
  const store = configureStore({
    reducer: { homeBooks: homeBooksSlice, formBooks: formBooksSlice },
  });

  await store.dispatch(fetchBooks('redux'));

  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    opts
  );
  return { store, stream };
}
