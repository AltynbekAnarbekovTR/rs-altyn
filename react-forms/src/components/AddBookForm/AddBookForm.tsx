import React, { Component } from 'react';
import styles from './AddBookForm.module.css';

interface Props {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  title: string;
  published: string;
  genre: string;
  author: string;
  pages: string;
  stock: boolean;
  image: string | null;
}

interface State {
  imagePreviewUrl: string | null;
}

class AddBook extends Component<Props, State> {
  private titleRef = React.createRef<HTMLInputElement>();

  private publishedRef = React.createRef<HTMLInputElement>();

  private genreRef = React.createRef<HTMLSelectElement>();

  private authorRef = React.createRef<HTMLInputElement>();

  private pagesRef = React.createRef<HTMLInputElement>();

  private stockRef = React.createRef<HTMLInputElement>();

  private imageRef = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      imagePreviewUrl: null,
    };
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const reader = new FileReader();
    const { imagePreviewUrl } = this.state;
    const title = this.titleRef.current?.value;
    if (title === '') {
      this.titleRef.current?.setCustomValidity('Title must not be emptly!');
    }
    const formData: FormData = {
      title,
      published: this.publishedRef.current?.value || '',
      genre: this.genreRef.current?.value || '',
      author: this.authorRef.current?.value || '',
      pages: this.pagesRef.current?.value || '',
      stock: this.stockRef.current?.checked || false,
      // image: this.imageRef.current?.files?.[0] || null,
      // // const { imagePreviewUrl } = this.state;
      image: imagePreviewUrl,
    };
    const { onSubmit } = this.props;
    console.log(formData);
    onSubmit(formData);
  };

  handleimageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imagePreviewUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({ imagePreviewUrl: null });
    }
  };

  render() {
    const { imagePreviewUrl } = this.state;

    return (
      <form className={styles['add-book-form']} onSubmit={this.handleSubmit}>
        <h2>Add Book</h2>
        <div>
          <label htmlFor="title">
            Title:
            <input id="title" type="text" ref={this.titleRef} />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author:
            <input id="author" type="author" ref={this.authorRef} />
          </label>
        </div>
        <div>
          <label htmlFor="pages">
            Page count:
            <input id="pages" type="author" ref={this.pagesRef} />
          </label>
        </div>
        <div>
          <label className="input-field date" htmlFor="birthday">
            published:
            <input id="birthday" type="date" ref={this.publishedRef} />
          </label>
        </div>
        <div className={styles['space-between']}>
          <div>
            <label htmlFor="genre">
              Genre:
              <select id="genre" ref={this.genreRef}>
                <option value="usa">Fiction</option>
                <option value="canada">Science fiction</option>
                <option value="mexico">Fantasy</option>
              </select>
            </label>
          </div>

          <div>
            <label className={styles.stock} htmlFor="stock">
              In stock:
              <input id="stock" type="checkbox" ref={this.stockRef} />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="pic">
            image:
            <input
              id="pic"
              type="file"
              accept="image/*"
              ref={this.imageRef}
              onChange={this.handleimageChange}
            />
            {imagePreviewUrl && (
              <div className={styles.preview}>
                <img src={imagePreviewUrl} alt="Preview" />
              </div>
            )}
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AddBook;
