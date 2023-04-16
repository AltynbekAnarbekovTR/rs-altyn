import React from 'react';
import { v4 } from 'uuid';
import FormCard from '../../components/Card/FormCard';
import AddBookForm from '../../components/AddBookForm/AddBookForm';
import styles from './AddBook.module.css';
import { useAppSelector } from '../../hooks/hooks';

const AddBook: React.FC = () => {
  const formCards = useAppSelector((state) => state.formBooks.formBooks);

  return (
    <div className="container">
      <AddBookForm />
      <ul className={styles.cards} data-testid="cards">
        {formCards.map((item) => {
          return (
            <FormCard
              key={v4()}
              title={item.title}
              author={item.author}
              genres={item.genres}
              cover={item.cover}
              published={item.published}
              pageCount={item.pageCount}
              stock={item.stock}
              bookType={item.bookType}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default AddBook;
