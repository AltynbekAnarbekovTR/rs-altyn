import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, vi } from 'vitest';

const onSearch = vi.fn();

describe('SearchBar', () => {
  it('Check if initially search bar is empty', () => {
    render(<SearchBar onSearch={onSearch} />);
    const searchbar = screen.getByRole('textbox') as HTMLInputElement;
    expect(searchbar.value).toBe('');
  });

  it('Check that search bar input work correctly', () => {
    render(<SearchBar onSearch={onSearch} />);
    const searchbar = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(searchbar, { target: { value: 'some input' } });
    expect(searchbar.value).toBe('some input');
  });
});
