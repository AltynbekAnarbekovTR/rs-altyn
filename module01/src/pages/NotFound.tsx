import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import notFoundImg from '../assets/not-found.png';

function NotFound() {
  return (
    <div className={styles['not-found']}>
      <div className="container">
        <div className={styles['not-found__box']}>
          <img src={notFoundImg} alt="" />
          <Link to="/">Go Home</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
