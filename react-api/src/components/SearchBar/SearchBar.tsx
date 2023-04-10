import React, { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';

interface Props {
  onSearch: (searchValue: string) => Promise<void>;
}

const SearchBar = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    localStorage.setItem('searchValue', inputRef.current?.value || '');
    setSearchValue(value);
  };

  useEffect(() => {
    onSearch(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchValue);
      }}
      className={styles.search}
    >
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
            <button
              data-testid="search"
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
