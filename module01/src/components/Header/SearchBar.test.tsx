import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

test('Check if initial search bar is empty', () => {
  render(<SearchBar />);
  const searchValue = screen.getByRole('textbox') as HTMLInputElement;
  expect(searchValue.value).toBe('');
});

test('Check if search bar input is saved in local storage and retrieved after component rerender', () => {
  render(<SearchBar />);
  const searchbar = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(searchbar, { target: { value: 'na' } });
  expect(searchbar.value).toBe('na');
});
