import React from 'react';
import { v4 } from 'uuid';
import Card from '../../components/Card/Card';
import AddBookForm from '../../components/AddBookForm/AddBookForm';
import styles from './AddBook.module.css';
import { FormData } from '../../types/types';
import ParentForm from '../../components/AddBookForm/ParentForm';

interface State {
  cards: FormData[];
}

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
        <ParentForm />
        <ul className={styles.cards} data-testid="cards">
          {cards.map((item) => {
            return (
              <Card
                key={v4()}
                title={item.title}
                author={item.author}
                genres={item.genres}
                image={item.image}
                published={item.published}
                pages={item.pages}
                stock={item.stock}
                bookType={item.bookType}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AddBook;
