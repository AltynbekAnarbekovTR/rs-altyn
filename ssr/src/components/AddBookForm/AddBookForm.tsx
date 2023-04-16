import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../hooks/hooks';
import { formBooksActions } from '../../store/formBooksSlice';
import styles from './AddBookForm.module.css';

export interface FormData {
  title: string;
  author: string;
  bookType: string;
  genres: string[];
  stock: string;
  published: string;
  pageCount: number;
  cover: FileList;
}

const AddBookForm: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({ mode: 'onSubmit' });

  const dispatch = useAppDispatch();

  const onSubmitHandler = (data: FormData) => {
    const imageUrl = URL.createObjectURL(data.cover[0]);
    dispatch(formBooksActions.addBook({ ...data, cover: imageUrl }));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, isSubmitSuccessful, reset]);

  const today = new Date().toISOString().slice(0, 10);
  const genres = ['Fiction', 'Non-Fiction', 'Fantasy', 'Sci-Fi'];

  return (
    <form
      data-testid="addBookForm"
      className={styles['add-book-form']}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className={styles['input-container']}>
        <label>
          Title:
          <input type="text" {...register('title', { validate: (value) => value.trim() !== '' })} />
          <p data-testid="titleError" className={styles.error}>
            {errors.title && 'Title is required'}
          </p>
        </label>
      </div>

      <div className={styles['input-container']}>
        <label>
          Author:
          <input
            type="text"
            {...register('author', { validate: (value) => value.trim() !== '' })}
          />
          <p data-testid="authorError" className={styles.error}>
            {errors.author && 'Author is required'}
          </p>
        </label>
      </div>

      <div className={styles['input-container']}>
        <label>
          Book Type:
          <select
            className={styles['book-type']}
            defaultValue=""
            {...register('bookType', { required: true })}
          >
            <option disabled={true} value="">
              Choose a book type
            </option>
            <option value="Hardcover">Hardcover</option>
            <option value="Paperback">Paperback</option>
            <option value="eBook">eBook</option>
          </select>
          <p data-testid="bookTypeError" className={styles.error}>
            {errors.bookType && 'Book type is required'}
          </p>
        </label>
      </div>

      <fieldset className={styles.genres}>
        <legend>Genres:</legend>
        {genres.map((item) => (
          <label key={v4()}>
            {item}
            <input
              data-testid={item}
              type="checkbox"
              {...register('genres', { required: true })}
              value={item}
            />
          </label>
        ))}
        <p data-testid="genresError" className={styles.error}>
          {errors.genres && 'At least one genre must be selected'}
        </p>
      </fieldset>

      <fieldset className="switch-field">
        <legend className="switch-title">Stock Status:</legend>
        <input
          data-testid="inStock"
          id="switch_left"
          type="radio"
          value="in-stock"
          {...register('stock', { required: true })}
        />
        <label htmlFor="switch_left">In Stock</label>
        <input
          id="switch_right"
          type="radio"
          value="out-of-stock"
          {...register('stock', { required: true })}
        />
        <label htmlFor="switch_right">Out of Stock</label>
        <p data-testid="stockError" className={styles.error}>
          {errors.stock && 'Stock status is required'}
        </p>
      </fieldset>

      <div className={styles['input-container']}>
        <label>
          Date:
          <input
            data-testid="published"
            type="date"
            {...register('published', {
              required: 'Publication date is required',
              validate: (value) => {
                const selectedDate = new Date(value);
                return selectedDate <= new Date(today) || 'Selected date must be before today';
              },
            })}
          />
          <p data-testid="publishedError" className={styles.error}>
            {errors.published && errors.published.message}
          </p>
        </label>
      </div>

      <div className={styles['input-container']}>
        <label>
          Page Count:
          <input
            type="number"
            {...register('pageCount', { required: true, valueAsNumber: true })}
          />
          <p data-testid="pagesError" className={styles.error}>
            {errors.pageCount && errors.pageCount.type === 'required' && 'Page count is required'}
            {errors.pageCount &&
              errors.pageCount.type === 'valueAsNumber' &&
              'Page count is required'}
          </p>
        </label>
      </div>

      <div className={styles['input-container']}>
        <label>
          Cover:
          <input type="file" accept="image/*" {...register('cover', { required: true })} />
          <p data-testid="coverError" className={styles.error}>
            {errors.cover && 'Image is required'}
          </p>
        </label>
      </div>
      <div className={styles['button-container']}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddBookForm;
