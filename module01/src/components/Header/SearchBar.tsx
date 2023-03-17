import React from 'react';
import styles from './SearchBar.module.css';
import searchImg from '../../assets/search.png';

type State = {
  searchValue: string;
};

class SearchBar extends React.Component<{}, State> {
  constructor(props = {}) {
    super(props);

    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue?.trim()) {
      this.setState(() => {
        return { searchValue: savedValue };
      });
    }
  }

  render() {
    const { searchValue } = this.state;

    return (
      <form className={styles.search}>
        <input
          value={searchValue}
          onChange={(e) => {
            this.setState(() => ({ searchValue: e.target.value }));
            localStorage.setItem('searchValue', searchValue);
          }}
          type="text"
          placeholder="Search"
          data-testid="search-bar"
        />
        <button type="submit">
          <img src={searchImg} alt="search" />
        </button>
      </form>
    );
  }
}

export default SearchBar;
