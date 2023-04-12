import React from 'react';
import styles from './Modal.module.css';
import { BookInfo } from 'types/types';

const Modal = ({
  setShowModal,
  infoLink,
  volumeInfo: {
    title,
    authors,
    categories,
    imageLinks: { thumbnail },
    publishedDate,
    pageCount,
    description,
  },
}: BookInfo) => {
  return (
    <div
      data-testid="modalBackground"
      onClick={() => {
        setShowModal(false);
      }}
      className={styles.modalBackground}
    >
      <div
        data-testid="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <button
          data-testid="modalClose"
          className={styles.closeButton}
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </button>
        <div className={styles.bookInfo}>
          <div className={styles.bookCover}>
            <img src={thumbnail} alt="Book cover" />
          </div>
          <div className={styles.bookDetails}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.author}>
              By <span>{authors || 'No author'}</span>
            </p>
            <p className={styles.published}>Published: {publishedDate || 'No publication date'}</p>
            <p className={styles.published}>Categories: {categories || 'No categories'}</p>
            <div className={styles.pageCount}>
              <p>Page count: {pageCount || 'No page count'}</p>
            </div>
            <a target="blank" href={infoLink} className={styles.more}>
              Go to Google Books
            </a>
          </div>
        </div>

        <div className={styles.bookDescription}>
          <p>{description || 'No description'}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
