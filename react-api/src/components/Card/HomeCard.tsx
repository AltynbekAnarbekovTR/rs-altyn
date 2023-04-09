import React from 'react';
import styles from './Card.module.css';
import { HomeCard } from '../../types/types';

function Card({ getBookInfo, id, title, author, cover }: HomeCard) {
  return (
    <li
      data-testid="homeCard"
      onClick={() => {
        getBookInfo(id, title);
      }}
      className={styles.card}
    >
      <div className={styles.cover}>
        <img src={cover} alt="Book cover" />
      </div>
      <div className={styles.description}>
        <h3 data-testid="card-title" className={styles.title}>
          {title}
        </h3>
        <p className={styles.author}>
          by <span data-testid="card-author">{author || 'No author'}</span>
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.showMore}>More Info</button>
        </div>
      </div>
    </li>
  );
}

export default Card;
