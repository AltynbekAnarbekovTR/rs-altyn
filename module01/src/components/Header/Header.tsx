import React from 'react';
import styles from './Header.module.css';
import logoImg from '../../assets/logo.png';
import SearchBar from './SearchBar';
import Navbar from './NavBar';

function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logoImg} alt="logo" />
          </div>
          <Navbar />
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
