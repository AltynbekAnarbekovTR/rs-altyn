import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from './store';

describe('App', () => {
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
  it('Render About Us paragraph', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const searchValue = screen.getByTestId('about') as HTMLParagraphElement;
    expect(searchValue).not.toBeEmptyDOMElement();
  });
  it('Renders add book', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    await userEvent.click(
      screen.getByRole('link', {
        name: /add book/i,
      })
    );
    expect(screen.getByTestId('addBookForm')).toBeInTheDocument();
  });
});
