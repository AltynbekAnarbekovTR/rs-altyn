import React from 'react';
import styles from './SearchBar.module.css';
import searchImg from '../../assets/search.png';

type State = {
  searchValue: string;
};

// type Props = null;

class SearchBar extends React.Component<{}, State> {
  render() {
    const { searchValue } = this.state;

    return (
      <form className={styles.search}>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <img src={searchImg} alt="search" />
        </button>
      </form>
    );
  }
}

export default SearchBar;
