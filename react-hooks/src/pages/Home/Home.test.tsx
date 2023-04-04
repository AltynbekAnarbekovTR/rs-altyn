import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('Render Cards', () => {
  render(<Home />);

  expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(1);
});
