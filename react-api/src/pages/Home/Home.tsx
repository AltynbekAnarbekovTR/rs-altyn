import React, { useEffect } from 'react';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';

const booksData = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genres: ['Fiction'],
    stock: 'in-stock',
    bookType: 'Hardcover',
    published: 'July 11, 1960',
    pages: 281,
    image: 'src/assets/To Kill a Mockingbird.webp',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genres: ['Fiction'],
    stock: 'in-stock',
    bookType: 'Hardcover',
    published: 'April 10, 1925',
    pages: 180,
    image: 'src/assets/Gatsby.webp',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genres: ['Fiction'],
    stock: 'in-stock',
    bookType: 'Paperback',
    published: 'June 8, 1949',
    pages: 328,
    image: 'src/assets/1984.webp',
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    genres: ['Science Fiction'],
    stock: 'in-stock',
    bookType: 'Hardcover',
    published: 'October 12, 1979',
    pages: 215,
    image: 'src/assets/Hitchhiker.webp',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genres: ['Fantasy'],
    stock: 'in-stock',
    bookType: 'Hardcover',
    published: 'July 29, 1954',
    pages: 1178,
    image: 'src/assets/The Lord of the Rings.webp',
  },
  {
    title: 'Crime and Punishment',
    author: 'F. M. Doestoevsky',
    genres: ['Fiction'],
    stock: 'in-stock',
    bookType: 'Hardcover',
    published: '1866',
    pages: 430,
    image: 'src/assets/Crime and punishment.webp',
  },
  {
    title: 'Anna Karenina',
    author: 'L. N. Tolstoy',
    genres: ['Fiction'],
    stock: 'in-stock',
    bookType: 'Hardcover',
    published: '1878',
    pages: 864,
    image: 'src/assets/Anna.webp',
  },
  {
    title: 'Flowers for Algernon',
    author: 'Daniel Keyes',
    genres: ['Science fiction'],
    stock: 'in-stock',
    bookType: 'Hardcover',
    published: 'April 1959',
    pages: 311,
    image: 'src/assets/Algernon.webp',
  },
];

const getBooks = async () => {
  // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}`);
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers`);
  const data = await response.json();
  console.log(data);
  return data;
};

function Home() {
  useEffect(() => {
    getBooks();
  }, []);

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
