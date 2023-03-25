import React from 'react';
import Card from '../../components/Card/Card';

import AddBookForm from '../../components/AddBookForm/AddBookForm';
import styles from './AddBook.module.css';
import { FormData } from '../../types/types';

interface State {
  cards: FormData[];
}

// interface FormData {
//   title: string;
//   author: string;
//   genre: string;
//   published: string;
//   pages: string;
//   stock: boolean;
//   image: string | null;
// }

class AddBook extends React.Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  handleSubmit = (formData: FormData) => {
    this.setState((prevState) => ({
      cards: [...prevState.cards, formData],
    }));
  };

  render() {
    const { cards } = this.state;
    return (
      <div className="container">
        <AddBookForm onSubmit={this.handleSubmit} />
        <ul className={styles.cards} data-testid="cards">
          {cards.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              author={item.author}
              genres={item.genres}
              image={item.image}
              published={item.published}
              pages={item.pages}
              stock={item.stock}
              bookType={item.bookType}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default AddBook;
