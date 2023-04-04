import React from 'react';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';
import booksData from '../../data/BooksData';

function Home() {
  return (
    <div className="container">
      <section>
        <SearchBar />
        <ul className={styles.cards} data-testid="cards">
          {booksData.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              author={item.author}
              genres={item.genres}
              stock={item.stock}
              bookType={item.bookType}
              cover={item.image}
              published={item.published}
              pageCount={item.pages}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
