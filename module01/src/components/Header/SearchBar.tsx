import React from 'react';
import styles from './SearchBar.module.css';

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
    console.log('Did Mount', savedValue);
    if (savedValue?.trim()) {
      console.log('Here', savedValue);
      this.setState({ searchValue: savedValue });
    }
  }

  componentWillUnmount() {
    const { searchValue } = this.state;
    console.log('Will Unmount', searchValue);
    localStorage.setItem('searchValue', searchValue);
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
                  console.log('input', searchValue);
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
