import { vi } from 'vitest';
import HomeCard from './HomeCard';
import React from 'react';
import { render, screen } from '@testing-library/react';

const getBookInfo = vi.fn();
test('Render Cards', async () => {
  const mockBook = {
    id: '1',
    volumeInfo: {
      title: 'React Testing Handbook',
      authors: ['John Doe'],
      imageLinks: { thumbnail: 'https://example.com/thumb.jpg' },
    },
  };

  render(
    <HomeCard
      getBookInfo={getBookInfo}
      id={mockBook.id}
      title={mockBook.volumeInfo.title}
      author={mockBook.volumeInfo.authors}
      cover={mockBook.volumeInfo.imageLinks.thumbnail}
    />
  );

  const titleElement = screen.getByText(mockBook.volumeInfo.title);
  const authorElement = screen.getByText(mockBook.volumeInfo.authors[0]);
  const thumbnailElement = screen.getByRole('img');

  expect(titleElement).toBeInTheDocument();
  expect(authorElement).toBeInTheDocument();
  expect(thumbnailElement).toBeInTheDocument();

  expect(thumbnailElement).toHaveAttribute('src', mockBook.volumeInfo.imageLinks.thumbnail);
  expect(thumbnailElement).toHaveAttribute('alt', `Book cover`);
});
