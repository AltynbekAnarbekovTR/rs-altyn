import { vi } from 'vitest';
import Modal from './Modal';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const setShowModal = vi.fn();
const mockBook = {
  id: '1',
  volumeInfo: {
    title: 'React Testing Handbook',
    authors: ['John Doe'],
    categories: ['Computers'],
    imageLinks: { thumbnail: 'https://example.com/thumb.jpg' },
    publishedDate: '2022-01-01',
    pageCount: 200,
    description: 'A comprehensive guide to testing React applications',
    infoLink: 'https://example.com/book',
  },
};

describe('Modal', () => {
  it('Render Modal', async () => {
    render(
      <Modal
        setShowModal={setShowModal}
        id={mockBook.id}
        infoLink={mockBook.volumeInfo.infoLink}
        volumeInfo={mockBook.volumeInfo}
      />
    );

    const titleElement = screen.getByText(mockBook.volumeInfo.title);
    const authorElement = screen.getByText(mockBook.volumeInfo.authors[0]);
    const categoryElement = screen.getByText(/Computers/i);
    const thumbnailElement = screen.getByRole('img');
    const publishedDateElement = screen.getByText(/2022-01-01/i);
    const pageCountElement = screen.getByText(/200/i);
    const descriptionElement = screen.getByText(
      /A comprehensive guide to testing React applications/i
    );

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(thumbnailElement).toBeInTheDocument();
    expect(publishedDateElement).toBeInTheDocument();
    expect(pageCountElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();

    expect(thumbnailElement).toHaveAttribute('src', mockBook.volumeInfo.imageLinks.thumbnail);
    expect(thumbnailElement).toHaveAttribute('alt', `Book cover`);
  });

  it('Test Modal window close on Background click', async () => {
    render(
      <Modal
        setShowModal={setShowModal}
        id={mockBook.id}
        infoLink={mockBook.volumeInfo.infoLink}
        volumeInfo={mockBook.volumeInfo}
      />
    );
    const modal = screen.queryByTestId('modal');
    const modalBackground = screen.getByTestId('modalBackground');
    await userEvent.click(modalBackground);
    expect(modal).toBeNull;
  });

  it('Test Modal window close on close button click', async () => {
    render(
      <Modal
        setShowModal={setShowModal}
        id={mockBook.id}
        infoLink={mockBook.volumeInfo.infoLink}
        volumeInfo={mockBook.volumeInfo}
      />
    );
    const modal = screen.queryByTestId('modal');
    const modalClose = screen.getByTestId('modalClose');
    await userEvent.click(modalClose);
    expect(modal).toBeNull;
  });
});
