import { vi } from 'vitest';
import HomeCard from './HomeCard';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const getBookInfo = vi.fn();
const mockBook = {
  id: '1',
  volumeInfo: {
    title: 'React Testing Handbook',
    authors: ['John Doe'],
    imageLinks: { thumbnail: 'https://example.com/thumb.jpg' },
  },
};

describe('HomeCard', () => {
  beforeEach(() => {});
  it('Render Card', async () => {
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
  it('Check that getBookInfo is being called', async () => {
    render(
      <HomeCard
        getBookInfo={getBookInfo}
        id={mockBook.id}
        title={mockBook.volumeInfo.title}
        author={mockBook.volumeInfo.authors}
        cover={mockBook.volumeInfo.imageLinks.thumbnail}
      />
    );
    await userEvent.click(screen.getByTestId('homeCard'));
    screen.debug();
    await waitFor(() => {
      expect(getBookInfo).toHaveBeenCalledTimes(1);
    });
  });
});
