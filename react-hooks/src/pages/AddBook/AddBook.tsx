import React, { useState } from 'react';
import { v4 } from 'uuid';
import Card from '../../components/Card/Card';
import AddBookForm from '../../components/AddBookForm/AddBookForm';
import styles from './AddBook.module.css';
import { CardData } from '../../types/types';

const AddBook: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  const handleSubmit = (formData: CardData) => {
    console.log(formData);
    setCards((prevCards) => [...prevCards, formData]);
  };

  return (
    <div className="container">
      <AddBookForm onSubmit={handleSubmit} />
      <ul className={styles.cards} data-testid="cards">
        {cards.map((item) => {
          return (
            <Card
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
