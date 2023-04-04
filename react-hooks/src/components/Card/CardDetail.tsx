import React from 'react';
import styles from './Card.module.css';

interface Props {
  type: string;
  value: string | number;
}

const CardDetail = ({ type, value }: Props) => {
  return (
    <p className={`${styles['flex-between']} ${styles.details}`}>
      <span>{type}:</span> <span data-testid="card-bookType">{value}</span>
    </p>
  );
};

export default CardDetail;
