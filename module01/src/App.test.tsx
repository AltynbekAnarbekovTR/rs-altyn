import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { App, WrappedApp } from './App';

describe('App', () => {
  it('Render cards', () => {
    // ARRANGE
    render(<WrappedApp />);
    // ACT
    // Expect
    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });
  it('Renders not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
  it('Render About Us paragraph', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    const searchValue = screen.getByTestId('about') as HTMLParagraphElement;
    expect(searchValue).not.toBeEmptyDOMElement();
  });
});
