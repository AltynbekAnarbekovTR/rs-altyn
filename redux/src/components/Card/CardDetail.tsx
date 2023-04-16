import React from 'react';
import styles from './Card.module.css';

interface Props {
  testid?: string;
  type: string;
  value?: string | number;
}

const CardDetail = ({ testid, type, value }: Props) => {
  return (
    <p className={`${styles['flex-between']} ${styles.details}`}>
      <span>{type}:</span> <span data-testid={testid}>{value || 'Unknown'}</span>
    </p>
  );
};

export default CardDetail;
