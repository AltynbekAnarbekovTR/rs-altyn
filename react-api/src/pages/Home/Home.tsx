import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import HomeCard from '../../components/Card/HomeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';
import { v4 } from 'uuid';
import Modal from './Modal';
import { BookInfo } from 'types/types';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    imageLinks: {
      thumbnail: string;
    };
    publishedDate: string;
    pageCount?: number;
  };
}
function Home() {
  const [books, setBooks] = useState<Array<Book>>();
  const [bookInfo, setBookInfo] = useState<BookInfo>();
  const [isLoading, setisLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  console.log(Array.isArray(books));
  console.log(typeof isLoading);
  console.log(books);

  const getBooks = async (searchValue: string) => {
    if (searchValue?.trim()) {
      setisLoading(true);
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&projection=lite&fields=items(id,volumeInfo(title,authors,categories,imageLinks/thumbnail,publishedDate,pageCount))`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error('Could not fetch the data for that resource');
          }
          return res.json();
        })
        .then((data) => {
          setisLoading(false);
          setError(null);
          setBooks(data.items);
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setisLoading(false);
        });
    }
  };

  const getBookInfo = async (bookId: string, bookTitle: string) => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookId} ${bookTitle}&fields=items(id,volumeInfo(title,authors,categories,imageLinks/thumbnail,publishedDate,pageCount, description))`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setBookInfo(data.items[0]);
        setShowModal(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="container">
      <section>
        <SearchBar onSearch={getBooks} />
        <div className={styles.cardsContainer}>
          {error && !isLoading && <div>{error}</div>}
          {isLoading && <ClipLoader color="#566ed9" />}
          {books && !error && !isLoading && (
            <ul className={styles.cards} data-testid="cards">
              {books.map(({ volumeInfo, id }) => {
                const thumbnail = volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail;
                return (
                  <HomeCard
                    getBookInfo={getBookInfo}
                    key={v4()}
                    id={id}
                    title={volumeInfo.title}
                    author={volumeInfo.authors}
                    cover={thumbnail}
                  />
                );
              })}
            </ul>
          )}
        </div>
        {showModal && bookInfo && (
          <Modal
            setShowModal={setShowModal}
            id={bookInfo.id}
            infoLink={bookInfo.infoLink}
            volumeInfo={bookInfo.volumeInfo}
          />
        )}
      </section>
    </div>
  );
}

export default Home;
