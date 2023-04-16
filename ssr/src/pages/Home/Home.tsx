import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import HomeCard from '../../components/Card/HomeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';
import { v4 } from 'uuid';
import Modal from './Modal';
import { BookInfo } from 'types/types';
import { fetchBooks } from '../../store/booksSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

function Home() {
  const [bookInfo, setBookInfo] = useState<BookInfo>();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const { homeBooks, loading, error, searchValue } = useAppSelector((state) => {
    return state.homeBooks;
  });

  useEffect(() => {
    if (searchValue.trim()) {
      dispatch(fetchBooks(searchValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
      .catch(() => {});
  };

  return (
    <div className="container">
      <section>
        <SearchBar />
        <div className={styles.cardsContainer}>
          {error && !loading && <div>{error}</div>}
          {loading && <ClipLoader color="#566ed9" />}
          {homeBooks && !error && !loading && (
            <ul className={styles.cards} data-testid="cards">
              {homeBooks.map(({ volumeInfo, id }) => {
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
