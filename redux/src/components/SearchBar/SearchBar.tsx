import React, { useRef } from 'react';
import styles from './SearchBar.module.css';
import { fetchBooks, homeBooksActions } from '../../store/booksSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.homeBooks.searchValue);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(fetchBooks(searchValue));
      }}
      className={styles.search}
    >
      <div className={styles.container}>
        <div className={`${styles.search_wrap} ${styles.search_wrap_1}`}>
          <div className={styles.search_box}>
            <input
              data-testid="search-input"
              ref={inputRef}
              type="text"
              className={styles.input}
              value={searchValue}
              onChange={(e) => dispatch(homeBooksActions.setSearchValue(e.target.value))}
              placeholder="search..."
            />
            <button
              data-testid="search-submit"
              type="submit"
              className={`${styles.btn} ${styles.btn_common}`}
            >
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
