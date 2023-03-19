import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';

test('Render Cards', () => {
  render(<MainPage />);

  expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1);
});
