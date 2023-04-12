import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

test('Render About', () => {
  render(<About />);
  const searchValue = screen.getByTestId('about');
  expect(searchValue).toBeInTheDocument();
});
