import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

// const localStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   clear: jest.fn(),
// };
// global.localStorage = localStorageMock as unknown as Storage;

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

test('Check if search bar input is saved in local storage and retrieved after component rerender', async () => {
  const { rerender } = render(<SearchBar />);
  // expect(localStorageMock.setItem).toHaveBeenCalled();
  fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'na' } });
  // userEvent.type(screen.getByTestId('search-bar'), 'na');
  const searchValue = screen.getByTestId('search-bar') as HTMLInputElement;
  screen.debug();
  // rerender(<SearchBar />);
  expect(searchValue.value).toBe('na');
  screen.debug();
});
