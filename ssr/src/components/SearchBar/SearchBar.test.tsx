import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../store';

describe('SearchBar', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
  });
  it('Check if initially search bar is empty', () => {
    const searchbar = screen.getByRole('textbox') as HTMLInputElement;
    expect(searchbar.value).toBe('');
  });

  it('Check that search bar input work correctly', () => {
    const searchbar = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(searchbar, { target: { value: 'some input' } });
    expect(searchbar.value).toBe('some input');
  });
});
