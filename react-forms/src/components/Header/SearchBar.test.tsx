import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

test('Check if initially search bar is empty', () => {
  render(<SearchBar />);
  const searchbar = screen.getByRole('textbox') as HTMLInputElement;
  expect(searchbar.value).toBe('');
});

test('Check that search bar input work correctly', () => {
  render(<SearchBar />);
  const searchbar = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(searchbar, { target: { value: 'some input' } });
  expect(searchbar.value).toBe('some input');
});
