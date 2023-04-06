import React from 'react';
import styles from './Card.module.css';
import { CardData } from '../../types/types';
import { v4 } from 'uuid';
import CardDetail from './CardDetail';

function Card({
  getBookInfo,
  id,
  title,
  author,
  genres,
  cover,
  published,
  pageCount,
  bookType,
  stock,
}: CardData) {
  return (
    <li
      onClick={() => {
        getBookInfo(id, title);
      }}
      className={styles.card}
    >
      <div className={styles.cover}>
        <img src={cover} alt="Book cover (need internet)" />
      </div>
      <div className={styles.description}>
        <h3 data-testid="card-title" className={styles.title}>
          {title}
        </h3>
        <p className={styles.author}>
          by <span data-testid="card-author">{author}</span>
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.showMore}>More Info</button>
        </div>
      </div>
    </li>
  );
}

export default Card;
