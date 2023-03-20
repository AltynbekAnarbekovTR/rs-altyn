import React from 'react';
import styles from './Card.module.css';

type Props = {
  title: string;
  author: string;
  genre: string;
  image: string;
  published: string;
  pages: string | number;
};

function Card({ title, author, genre, image, published, pages }: Props) {
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
          <span>Genre:</span> <span>{genre}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Published:</span> <span>{published}</span>
        </p>
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Pages:</span> <span>{pages}</span>
        </p>
      </div>
    </li>
  );
}

export default Card;
