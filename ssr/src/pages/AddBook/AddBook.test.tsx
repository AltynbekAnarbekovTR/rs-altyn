import React from 'react';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import AddBook from './AddBook';
import { Provider } from 'react-redux';
import store from '../../store';

describe('AddBookForm', () => {
  global.URL.createObjectURL = vi.fn();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <AddBook />
      </Provider>
    );
  });

  it('Card is created when form is submitted', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    await user.type(getTitle(), 'War and Peace');

    await user.type(getAuthor(), 'Leo Tolstoy');

    const option = within(getBookType()).getByRole('option', { name: /hardcover/i });
    await user.selectOptions(getBookType(), option);

    await user.click(getGenres());

    await user.click(getStock());

    fireEvent.mouseDown(getPublished());
    fireEvent.change(getPublished(), { target: { value: '2020-05-12' } });

    await user.type(getPages(), '1100');

    await user.upload(getCover(), file);

    expect(getTitle()).toHaveValue('War and Peace');
    expect(getAuthor()).toHaveValue('Leo Tolstoy');
    expect(getBookType().value).to.equal('Hardcover');
    expect(getGenres().checked).toEqual(true);
    expect(getStock().checked).toEqual(true);
    expect(getPublished()).toHaveValue('2020-05-12');
    expect(getPages()).toHaveValue(1100);

    await user.click(getSubmit());

    const listitems = await screen.findAllByRole('listitem');

    const image = screen.getByRole('img', {
      name: /book cover \(need internet\)/i,
    });

    expect(listitems.length).toBe(1);
    expect(image).toBeInTheDocument();
    const titleTest = await screen.findByTestId('card-title');
    expect(titleTest).toHaveTextContent(/War and Peace/i);
    expect(screen.getByTestId('card-author')).toHaveTextContent(/Leo Tolstoy/i);
    expect(screen.getByTestId('card-bookType')).toHaveTextContent(/Hardcover/i);
    expect(screen.getByTestId('card-stock')).toHaveTextContent(/Yes/i);
    expect(screen.getByTestId('card-published')).toHaveTextContent(/2020-05-12/i);
    expect(screen.getByTestId('card-pages')).toHaveTextContent(/1100/i);
  });
  it('Check empty inputs', async () => {
    await user.click(getSubmit());
    const titleError = screen.getByTestId('titleError');
    const authorError = screen.getByTestId('authorError');
    const bookTypeError = screen.getByTestId('bookTypeError');
    const genresError = screen.getByTestId('genresError');
    const stockError = screen.getByTestId('stockError');
    const publishedError = screen.getByTestId('publishedError');
    const pagesError = screen.getByTestId('pagesError');
    const coverError = screen.getByTestId('coverError');

    expect(titleError).toHaveTextContent(/Title is required/i);
    expect(authorError).toHaveTextContent(/Author is required/i);
    expect(bookTypeError).toHaveTextContent(/Book type is required/i);
    expect(genresError).toHaveTextContent(/At least one genre must be selected/i);
    expect(stockError).toHaveTextContent(/Stock status is required/i);
    expect(publishedError).toHaveTextContent(/Publication date is required/i);
    expect(pagesError).toHaveTextContent(/Page count is required/i);
    expect(coverError).toHaveTextContent(/Image is required/i);
  });
});

const getTitle = () =>
  screen.getByRole('textbox', {
    name: /title:/i,
  });

const getAuthor = () =>
  screen.getByRole('textbox', {
    name: /author:/i,
  });

const getBookType = () =>
  screen.getByRole('combobox', {
    name: /type:/i,
  }) as HTMLSelectElement;

const getGenres = () => screen.getByTestId('Fantasy') as HTMLInputElement;

const getStock = () => screen.getByTestId('inStock') as HTMLInputElement;

const getPublished = () => screen.getByTestId('published');

const getPages = () =>
  screen.getByRole('spinbutton', {
    name: /page count:/i,
  });

const getCover = () => screen.getByLabelText(/cover:/i);

const getSubmit = () =>
  screen.getByRole('button', {
    name: /submit/i,
  });
