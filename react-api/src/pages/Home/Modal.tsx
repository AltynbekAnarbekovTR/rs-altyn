import React from 'react';
import styles from './Modal.module.css';
// import cover from '../../assets/1984.webp';

const Modal = ({ setShowModal, bookInfo }) => {
  console.log('Modal book info', bookInfo);
  const {
    imageLinks: { thumbnail },
    title,
    authors,
    publishedDate,
    description,
    categories,
    infoLink,
  } = bookInfo.volumeInfo;
  return (
    <div
      onClick={() => {
        setShowModal(false);
      }}
      className={styles.modalBackground}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalContainer}
      >
        <button
          className={styles.closeButton}
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </button>
        <div className={styles.bookInfo}>
          <div className={styles.bookCover}>
            <img src={thumbnail} alt="" />
          </div>
          <div className={styles.bookDetails}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.author || 'No author'}>
              By <span>{authors}</span>
            </p>
            <p className={styles.published}>Published: {publishedDate || 'No publication date'}</p>
            <p className={styles.published}>Categories: {categories || 'No categories'}</p>
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
