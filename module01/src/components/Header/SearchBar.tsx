import React from 'react';
import styles from './SearchBar.module.css';
import searchImg from '../../assets/search.png';

type State = {
  searchValue: string;
  counter: number;
};

class SearchBar extends React.Component<{}, State> {
  constructor(props = {}) {
    super(props);

    this.state = {
      searchValue: '',
      counter: 0,
    };
  }

  componentDidMount() {
    this.setState((prevState) => {
      return { counter: prevState.counter + 1 };
    });
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue?.trim()) {
      this.setState(() => {
        return { searchValue: savedValue };
      });
    }
  }

  render() {
    const { searchValue } = this.state;
    const { counter } = this.state;

    return (
      <form className={styles.search}>
        <p>{counter}</p>
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
