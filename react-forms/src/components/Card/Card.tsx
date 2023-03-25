import React from 'react';
import styles from './Card.module.css';
import { FormData } from '../../types/types';

// type Props = {
//   title: string;
//   author: string;
//   genre: string;
//   image: string;
//   published: string;
//   pages: string | number;
// };

function Card({ title, author, genres, image, published, pages, bookType, stock }: FormData) {
  return (
    <li className={styles.card}>
      <div className={styles.cover}>
        <img src={image} alt="Book cover (need internet)" />
      </div>
      <div className={styles.description}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>
          by <span>{author}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Genre:</span>{' '}
          {genres?.map((item) => (
            <span>{item}</span>
          ))}
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Type:</span> <span>{bookType}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Published:</span> <span>{published}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Pages:</span> <span>{pages}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>In Stock:</span> <span>{stock ? 'Yes' : 'No'}</span>
        </p>
      </div>
    </li>
  );
}

export default Card;
