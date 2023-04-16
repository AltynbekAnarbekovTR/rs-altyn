import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './Home';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../store';

const server = setupServer(
  rest.get('https://www.googleapis.com/books/v1/volumes', (req, res, ctx) => {
    const searchValue = req.url.searchParams.get('q');
    if (searchValue === 'error') {
      return res(ctx.status(500));
    } else {
      const data = {
        items: [
          {
            id: '123',
            volumeInfo: {
              title: `${searchValue}`,
              authors: ['Mock Author'],
              imageLinks: {
                thumbnail: 'https://example.com/mock-thumbnail.jpg',
              },
            },
          },
        ],
      };
      return res(ctx.json(data));
    }
  })
);

beforeAll(() => server.listen());
beforeEach(() => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
});
afterAll(() => server.close());

afterEach(() => server.resetHandlers());

describe('Home', () => {
  it('displays book data when a search is made', async () => {
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'react' } });

    const searchButton = screen.getByTestId('search-submit');
    fireEvent.click(searchButton);

    const bookTitle = await screen.findByText('react');
    const bookAuthor = await screen.findByText('Mock Author');

    const bookThumbnail = await screen.findByAltText('Book cover');

    expect(bookTitle).toBeInTheDocument();
    expect(bookAuthor).toBeInTheDocument();
    expect(bookThumbnail).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('homeCard'));
    const modal = await screen.findByTestId('modal');
    expect(modal).toBeInTheDocument();
  });

  it('displays an error message when a search fails', async () => {
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'error' } });

    const searchButton = screen.getByTestId('search-submit');
    fireEvent.click(searchButton);

    const errorMessage = await screen.findByText(/Failed to fetch/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
