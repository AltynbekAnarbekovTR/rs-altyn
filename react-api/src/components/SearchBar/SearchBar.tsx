import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    localStorage.setItem('searchValue', inputRef.current?.value || '');
    setSearchValue(value);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue) {
      setSearchValue(savedValue);
    }
  }, []);

  return (
    <form onSubmit={(e) => onSearch(searchValue, e)} className={styles.search}>
      <div className={styles.container}>
        <div className={`${styles.search_wrap} ${styles.search_wrap_1}`}>
          <div className={styles.search_box}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={searchValue}
              onChange={searchInputHandler}
              placeholder="search..."
            />
            <button type="submit" className={`${styles.btn} ${styles.btn_common}`}>
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
