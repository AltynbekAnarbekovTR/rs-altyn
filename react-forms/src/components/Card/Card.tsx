import React from 'react';
import styles from './Card.module.css';
import { FormData } from '../../types/types';
import { v4 } from 'uuid';

function Card({ title, author, genres, image, published, pages, bookType, stock }: FormData) {
  return (
    <li className={styles.card}>
      <div className={styles.cover}>
        <img src={image} alt="Book cover (need internet)" />
      </div>
      <div className={styles.description}>
        <h3 data-testid="card-title" className={styles.title}>
          {title}
        </h3>
        <p className={styles.author}>
          by <span data-testid="card-author">{author}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Genre:</span>{' '}
          {genres?.map((item) => (
            <span data-testid="card-genres" key={v4()}>
              {item}
            </span>
          ))}
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Type:</span> <span data-testid="card-bookType">{bookType}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Published:</span> <span data-testid="card-published">{published}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Pages:</span> <span data-testid="card-pages">{pages}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>In Stock:</span> <span data-testid="card-stock">{stock ? 'Yes' : 'No'}</span>
        </p>
      </div>
    </li>
  );
}

export default Card;
