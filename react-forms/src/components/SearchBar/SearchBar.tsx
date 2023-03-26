import React from 'react';
import styles from './SearchBar.module.css';

type State = {
  searchValue: string;
};

class SearchBar extends React.Component<{}, State> {
  constructor(props = {}) {
    super(props);

    this.state = {
      searchValue: localStorage.getItem('searchValue') || '',
    };
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue?.trim()) {
      this.setState({ searchValue: savedValue });
    }
  }

  componentWillUnmount() {
    const { searchValue } = this.state;
    if (searchValue.trim() !== '') {
      localStorage.setItem('searchValue', searchValue);
    }
  }

  render() {
    const { searchValue } = this.state;

    return (
      <form className={styles.search}>
        <div className={styles.container}>
          <div className={`${styles.search_wrap} ${styles.search_wrap_1}`}>
            <div className={styles.search_box}>
              <input
                type="text"
                className={styles.input}
                value={searchValue}
                onChange={(e) => {
                  this.setState(() => ({ searchValue: e.target.value }));
                }}
                placeholder="search..."
              />
              <div className={`${styles.btn} ${styles.btn_common}`}>
                <i className="fas fa-search" />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
