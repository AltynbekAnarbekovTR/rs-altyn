import React from 'react';
import styles from './SearchBar.module.css';
import searchImg from '../../assets/search.png';

type State = {
  searchValue: string;
};

class SearchBar extends React.Component<null, State> {
  constructor() {
    super(null);

    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue?.trim()) {
      this.setState({ searchValue: savedValue });
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
        />
        <button type="submit">
          <img src={searchImg} alt="search" />
        </button>
      </form>
    );
  }
}

export default SearchBar;
