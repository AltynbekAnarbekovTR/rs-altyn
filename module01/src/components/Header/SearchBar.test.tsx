import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

// interface Store {
//   [key: string]: number | string;
// }

// const localStorageMock = (function () {
//   let store: Store = {};

//   return {
//     getItem(key: string) {
//       return store[key];
//     },

//     setItem(key: string, value: string | number) {
//       store[key] = value;
//     },

//     clear() {
//       store = {};
//     },

//     removeItem(key: string) {
//       delete store[key];
//     },

//     getAll() {
//       return store;
//     },
//   };
// })();

// Object.defineProperty(window, 'localStorage', { value: localStorageMock });

test('Check if initial search bar is empty', () => {
  render(<SearchBar />);
  const searchValue = screen.getByTestId('search-bar') as HTMLInputElement;
  expect(searchValue.value).toBe('');
});

test('Check if search bar input is saved in local storage and retrieved after component rerender', () => {
  const { rerender } = render(<SearchBar />);
  fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'na' } });
  const searchValue = screen.getByTestId('search-bar') as HTMLInputElement;
  rerender(<SearchBar />);
  expect(searchValue.value).toBe('na');
});
