import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AddBookForm from './AddBookForm';

describe('AddBookForm', () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<AddBookForm />);
  });

  it('onSubmit is called when all fields pass validation', () => {
    // ACT
    // Expect
    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });
  it('1onSubmit is called when all fields pass validation', () => {
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
  it('Render About Us paragraph', () => {});
});

screen.getByRole('textbox', {
  name: /title:/i,
});
