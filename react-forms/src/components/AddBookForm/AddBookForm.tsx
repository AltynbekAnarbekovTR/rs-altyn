import React, { Component } from 'react';
import styles from './AddBookForm.module.css';
import { FormData } from '../../types/types';

interface Props {
  onSubmit: (formData: FormData) => void;
}

interface State {
  titleError: string;
  authorError: string;
  imagePreviewUrl: string | null;
  pagesError: string;
  genresError: string;
  bookTypeError: string;
  switcherIsPressed: boolean;
  switcherError: string;
  publishedError: string;
  coverError: string;
  submitted: boolean;
  formHasError: boolean;
}

class AddBook extends Component<Props, State> {
  private titleRef = React.createRef<HTMLInputElement>();

  private authorRef = React.createRef<HTMLInputElement>();

  private stockRef = React.createRef<HTMLInputElement>();

  private bookTypeRef = React.createRef<HTMLSelectElement>();

  private publishedRef = React.createRef<HTMLInputElement>();

  private pagesRef = React.createRef<HTMLInputElement>();

  private imageRef = React.createRef<HTMLInputElement>();

  private fictionRef = React.createRef<HTMLInputElement>();

  private nonFictionRef = React.createRef<HTMLInputElement>();

  private fantasyRef = React.createRef<HTMLInputElement>();

  private scifiRef = React.createRef<HTMLInputElement>();

  private outOfStockRef = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      titleError: '',
      authorError: '',
      pagesError: '',
      imagePreviewUrl: null,
      bookTypeError: '',
      genresError: '',
      switcherIsPressed: false,
      switcherError: '',
      publishedError: '',
      coverError: '',
      submitted: false,
      formHasError: false,
    };
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formHasError = false;
    const { imagePreviewUrl } = this.state;
    const title = this.titleRef.current?.value || '';
    const published = this.publishedRef.current?.value || '';
    const stock = this.stockRef.current?.checked || false;
    const bookType = this.bookTypeRef.current?.value || '';
    const author = this.authorRef.current?.value || '';
    const pages = this.pagesRef.current?.value || '';
    const fiction = this.fictionRef.current?.checked;
    const nonFiction = this.nonFictionRef.current?.checked;
    const fantasy = this.fantasyRef.current?.checked || false;
    const scifi = this.scifiRef.current?.checked || false;

    const genresObjects = [
      { name: 'Fiction', checked: fiction },
      { name: 'Non-Fiction', checked: nonFiction },
      { name: 'Fantasy', checked: fantasy },
      { name: 'Sci-Fi', checked: scifi },
    ].filter((item) => item.checked);
    const genres = genresObjects.map((item) => item.name);

    this.resetErrors();
    await this.isEmpty('titleError', title);
    await this.isEmpty('authorError', author);
    if (
      author !== '' &&
      author.split(' ').every((word) => word[0].toUpperCase() === word[0]) === false
    ) {
      this.setState({ authorError: 'Every word must start from an uppercase letter' });
    }

    await this.isEmpty('pagesError', pages);

    if (bookType === 'default') {
      this.setState({ bookTypeError: 'Please select an option' });
      formHasError = true;
    }

    if (genres.length === 0) {
      this.setState({ genresError: 'Please select at least one genre' });
      formHasError = true;
    }

    await this.isEmpty('publishedError', published);
    if (!this.state.switcherIsPressed) {
      this.setState({ switcherError: 'Please choose an option' });
      formHasError = true;
    }

    if (published === '') {
      this.setState({ publishedError: 'Please specify publication date' });
      formHasError = true;
    }

    if (!this.state.imagePreviewUrl) {
      this.setState({ coverError: 'Please choose an image' });
      formHasError = true;
    }

    if (this.state.formHasError) return;
    const formData: FormData = {
      title,
      published,
      genres,
      stock,
      bookType,
      author,
      pages,
      image: imagePreviewUrl,
    };
    const { onSubmit } = this.props;
    onSubmit(formData);
    this.titleRef.current!.value = '';
    this.authorRef.current!.value = '';
    this.bookTypeRef.current!.value = 'default';
    this.fictionRef.current!.checked = false;
    this.nonFictionRef.current!.checked = false;
    this.fantasyRef.current!.checked = false;
    this.scifiRef.current!.checked = false;
    this.stockRef.current!.checked = false;
    this.outOfStockRef.current!.checked = false;
    this.publishedRef.current!.value = '';
    this.pagesRef.current!.value = '';
    this.imageRef.current!.value = '';
    this.setState({ imagePreviewUrl: '' });
    this.setState({ submitted: true });
  };

  resetErrors = () => {
    this.setState({ titleError: '' });
    this.setState({ authorError: '' });
    this.setState({ bookTypeError: '' });
    this.setState({ genresError: '' });
    this.setState({ switcherError: '' });
    this.setState({ publishedError: '' });
    this.setState({ pagesError: '' });
    this.setState({ coverError: '' });
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

  isEmpty<K extends keyof State>(key: K, value: string) {
    return new Promise<void>((resolve) => {
      if (value!.trim() === '') {
        console.log('value');
        this.setState({ formHasError: true });
        this.setState({ [key]: 'This field must not be empty' } as Pick<State, K>);
        this.setState({ submitted: false }, () => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  render() {
    const {
      imagePreviewUrl,
      titleError,
      authorError,
      pagesError,
      bookTypeError,
      genresError,
      switcherIsPressed,
      switcherError,
      publishedError,
      coverError,
      submitted,
    } = this.state;
    return (
      <form className={styles['add-book-form']} onSubmit={this.handleSubmit}>
        <h2>Add Book</h2>
        <div>
          <label htmlFor="title">
            Title:
            <input id="title" type="text" ref={this.titleRef} />
            {titleError !== '' && <p className={styles.error}> {titleError} </p>}
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author:
            <input id="author" type="text" ref={this.authorRef} />
            {authorError !== '' && <p className={styles.error}> {authorError} </p>}
          </label>
        </div>
        <div className={styles['space-between']}>
          <div>
            <label htmlFor="bookType">
              Type:
              <select id="bookType" defaultValue="default" ref={this.bookTypeRef}>
                <option style={{ display: 'none' }} value="default" disabled>
                  --Select one--
                </option>
                <option value="Hardcover">Hardcover</option>
                <option value="Paperback">Paperback</option>
                <option value="eBook">eBook</option>
              </select>
              {bookTypeError !== '' && <p className={styles.error}> {bookTypeError} </p>}
            </label>
          </div>
        </div>

        <div className={styles.genres}>
          <label className={styles.stock} htmlFor="stock">
            Fiction
            <input id="fiction" type="checkbox" ref={this.fictionRef} />
          </label>
          <label className={styles.stock} htmlFor="stock">
            Non-Fiction
            <input id="non-fiction" type="checkbox" ref={this.nonFictionRef} />
          </label>
          <label className={styles.stock} htmlFor="stock">
            Sci-Fi
            <input id="sci-fi" type="checkbox" ref={this.fantasyRef} />
          </label>
          <label className={styles.stock} htmlFor="stock">
            Fantasy
            <input id="fantasy" type="checkbox" ref={this.scifiRef} />
          </label>
          {genresError !== '' && <p className={styles.error}> {genresError} </p>}
        </div>
        <div className="switch-field">
          <div className="switch-title">Timeframe</div>
          <input
            type="radio"
            id="switch_left"
            name="switchToggle"
            value="In Stock"
            onChange={(e) => console.log('In Stock', e.target.value)}
            ref={this.stockRef}
            onClick={() => {
              this.setState({ switcherIsPressed: true });
            }}
          />
          <label htmlFor="switch_left">In Stock</label>

          <input
            type="radio"
            id="switch_right"
            name="switchToggle"
            value="Out of Stock"
            onChange={(e) => console.log('Out of stock', e.target.value)}
            onClick={() => {
              this.setState({ switcherIsPressed: true });
            }}
            ref={this.outOfStockRef}
          />
          <label htmlFor="switch_right">Out of Stock</label>
          {switcherError !== '' && <p className={styles.error}> {switcherError} </p>}
        </div>
        <div>
          <label className="input-field date" htmlFor="published">
            Published:
            <input id="published" type="date" ref={this.publishedRef} />
            {publishedError !== '' && <p className={styles.error}> {publishedError} </p>}
          </label>
        </div>
        <div>
          <label htmlFor="pages">
            Page count:
            <input id="pages" type="number" ref={this.pagesRef} />
            {pagesError !== '' && <p className={styles.error}> {pagesError} </p>}
          </label>
        </div>
        <div>
          <label htmlFor="cover">
            Cover:
            <input
              id="cover"
              type="file"
              accept="image/*"
              ref={this.imageRef}
              onChange={this.handleimageChange}
            />
            {coverError !== '' && <p className={styles.error}> {coverError} </p>}
            {imagePreviewUrl && (
              <div className={styles.preview}>
                <img src={imagePreviewUrl} alt="Preview" />
              </div>
            )}
          </label>
        </div>
        <button type="submit">Submit</button>
        {submitted && <p className={styles.submitted}>Card successfully created</p>}
      </form>
    );
  }
}

export default AddBookForm;
