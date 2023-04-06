import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';
import booksData from '../../data/BooksData';
import { v4 } from 'uuid';
import Modal from './Modal';

function Home() {
  const [books, setBooks] = useState();
  const [bookInfo, setBookInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  const getBooks = async (searchValue, event) => {
    event.preventDefault();
    // const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}`);
    console.log(searchValue);
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`);
    const data = await response.json();
    setBooks(data.items);
    console.log('getBooks: ', data);
    // return data;
  };

  const getBookInfo = async (bookId, bookTitle) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookId} ${bookTitle}`
    );
    const data = await response.json();
    console.log('getBookInfo', data);
    setBookInfo(data.items[0]);
    setShowModal(true);
  };

  useEffect(() => {
    // getBooks('Boom');
  }, []);

  console.log('component: ', books);
  return (
    <div className="container">
      <section>
        <SearchBar onSearch={getBooks} />
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

        {books && (
          <ul className={styles.cards} data-testid="cards">
            {/* {books.map(({ volumeInfo }) => (
              <Card
                key={v4()}
                title={volumeInfo.title}
                author={volumeInfo.author}
                genres={item.genres}
                stock={item.stock}
                bookType={item.bookType}
                cover={item.image}
                published={item.published}
                pageCount={item.pages}
              />
            ))} */}
            {books.map(({ volumeInfo, id }) => {
              let thumbnail = volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail;
              return (
                // <div>
                //   <img src={thumbnail} alt="" />
                //   <div>{volumeInfo.title}</div>
                //   <div>{volumeInfo.authors}</div>
                //   <div>{volumeInfo.categories}</div>
                //   <div>{volumeInfo.pageCount}</div>
                //   <div>{volumeInfo.publishedDate}</div>
                // </div>
                <Card
                  getBookInfo={getBookInfo}
                  key={v4()}
                  id={id}
                  title={volumeInfo.title}
                  author={volumeInfo.author}
                  genres={volumeInfo.categories}
                  // stock={item.stock}
                  // bookType={item.bookType}
                  cover={thumbnail}
                  published={volumeInfo.publishedDate}
                  pageCount={volumeInfo.pageCount}
                />
              );
            })}
          </ul>
        )}
        <button
          onClick={() => {
            setShowModal((showModal) => !showModal);
          }}
        >
          Show Modal
        </button>
        {showModal && bookInfo && (
          <Modal
            bookInfo={bookInfo}
            setShowModal={setShowModal}
            // title={bookInfo.title}
            // author={bookInfo.author}
            // genres={bookInfo.categories}
            // // stock={item.stock}
            // // bookType={item.bookType}
            // // cover={thumbnail}
            // published={bookInfo.publishedDate}
            // pageCount={bookInfo.pageCount}
          />
        )}
      </section>
    </div>
  );
}

export default Home;
