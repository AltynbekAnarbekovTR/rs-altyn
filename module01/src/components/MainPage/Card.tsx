import React from 'react';
import styles from './Card.module.css';

type Props = {
  title: string;
  author: string;
  genre: string;
  image: string;
};

function Card({ title, author, genre, image }: Props) {
  return (
    <li className={styles.card}>
      <div className={styles.cover}>
        <img src={image} alt="" />
      </div>
      <div className={styles.description}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>
          by <span>{author}</span>
        </p>
        <h6 className={styles.genre}>{genre}</h6>
      </div>
    </li>
  );
}

export default Card;
