import React from 'react';
import styles from './Card.module.css';
import { FormCardData } from '../../types/types';
import { v4 } from 'uuid';
import CardDetail from './CardDetail';

function FormCard({
  title,
  author,
  genres,
  cover,
  published,
  pageCount,
  bookType,
  stock,
}: FormCardData) {
  return (
    <li className={styles.card}>
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
        <p className={`${styles['flex-between']} ${styles.details}`}>
          <span>Genre:</span>{' '}
          {genres?.map((item) => (
            <span data-testid="card-genres" key={v4()}>
              {item}
            </span>
          ))}
        </p>
        <CardDetail testid="card-bookType" type="Type" value={bookType} />
        <CardDetail testid="card-published" type="Published" value={published} />
        <CardDetail testid="card-pages" type="Pages" value={pageCount} />
        <CardDetail testid="card-stock" type="In Stock" value={stock ? 'Yes' : 'No'} />
      </div>
    </li>
  );
}

export default FormCard;
