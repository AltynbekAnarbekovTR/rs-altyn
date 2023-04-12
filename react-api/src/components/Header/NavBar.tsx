import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles['nav-list']}>
        <li className={styles['nav-item']}>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? 'active' : '';
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-book"
            className={({ isActive }) => {
              return isActive ? 'active' : '';
            }}
          >
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return isActive ? 'active' : '';
            }}
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
