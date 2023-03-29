// import React, { Component } from 'react';
// import styles from './AddBookForm.module.css';
// import { FormData } from '../../types/types';
// import TextInput from './TextInput';
// import ErrorMessage from './ErrorMessage';

// interface Props {
//   onSubmit: (formData: FormData) => void;
// }

// interface State {
//   titleError: string;
//   authorError: string;
//   imagePreviewUrl: string | undefined;
//   pagesError: string;
//   genresError: string;
//   bookTypeError: string;
//   switcherIsPressed: boolean;
//   switcherError: string;
//   publishedError: string;
//   coverError: string;
//   submitted: boolean;
//   formHasError: boolean;
// }

// class AddBookForm extends Component<Props, State> {
//   private titleRef = React.createRef<HTMLInputElement>();

//   private authorRef = React.createRef<HTMLInputElement>();

//   private stockRef = React.createRef<HTMLInputElement>();

//   private bookTypeRef = React.createRef<HTMLSelectElement>();

//   private publishedRef = React.createRef<HTMLInputElement>();

//   private pagesRef = React.createRef<HTMLInputElement>();

//   private imageRef = React.createRef<HTMLInputElement>();

//   private fictionRef = React.createRef<HTMLInputElement>();

//   private nonFictionRef = React.createRef<HTMLInputElement>();

//   private fantasyRef = React.createRef<HTMLInputElement>();

//   private scifiRef = React.createRef<HTMLInputElement>();

//   private outOfStockRef = React.createRef<HTMLInputElement>();

//   private formRef = React.createRef<HTMLFormElement>();

//   constructor(props: Props) {
//     super(props);

//     state = {
//       titleError: '',
//       authorError: '',
//       pagesError: '',
//       imagePreviewUrl: '',
//       bookTypeError: '',
//       genresError: '',
//       switcherIsPressed: false,
//       switcherError: '',
//       publishedError: '',
//       coverError: '',
//       submitted: false,
//       formHasError: false,
//     };
//   }

//   handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const { imagePreviewUrl } = state;
//     const title = titleRef.current?.value || '';
//     const published = publishedRef.current?.value || '';
//     const stock = stockRef.current?.checked || false;
//     const bookType = bookTypeRef.current?.value || '';
//     const author = authorRef.current?.value || '';
//     const pages = pagesRef.current?.value || '';
//     const fiction = fictionRef.current?.checked;
//     const nonFiction = nonFictionRef.current?.checked;
//     const fantasy = fantasyRef.current?.checked || false;
//     const scifi = scifiRef.current?.checked || false;

//     const genresObjects = [
//       { name: 'Fiction', checked: fiction },
//       { name: 'Non-Fiction', checked: nonFiction },
//       { name: 'Fantasy', checked: fantasy },
//       { name: 'Sci-Fi', checked: scifi },
//     ].filter((item) => item.checked);
//     const genres = genresObjects.map((item) => item.name);

//     resetErrors();

//     await validateInput('titleError', title, '', 'This field must not be empty');

//     await validateInput('authorError', author, '', 'This field must not be empty');
//     if (author !== '') {
//       await validateInput(
//         'authorError',
//         author.split(' ').every((word) => word[0].toUpperCase() === word[0]),
//         false,
//         'Every word must start from an uppercase letter'
//       );
//     }

//     await validateInput('pagesError', pages, '', 'This field must not be empty');
//     if (pages !== '') {
//       await validateInput(
//         'pagesError',
//         /^\d+$/.test(pages),
//         false,
//         'Pages count must be a number'
//       );
//     }

//     await validateInput('bookTypeError', bookType, 'default', 'Please select an option');

//     await validateInput('genresError', genres.length, 0, 'Please select at least one genre');

//     await validateInput(
//       'switcherError',
//       state.switcherIsPressed,
//       false,
//       'Please choose an option'
//     );

//     await validateInput('publishedError', published, '', 'This field must not be empty');
//     if (published) {
//       await validateInput(
//         'publishedError',
//         Date.parse(new Date().toISOString().split('T')[0]) - Date.parse(published) > 0,
//         false,
//         'Please choose a date before today'
//       );
//     }

//     await validateInput(
//       'coverError',
//       state.imagePreviewUrl,
//       '',
//       'Please choose an image'
//     );

//     if (state.formHasError) return;

//     const formData: FormData = {
//       title,
//       published,
//       genres,
//       stock,
//       bookType,
//       author,
//       pages,
//       image: imagePreviewUrl,
//     };

//     const { onSubmit } = props;
//     onSubmit(formData);
//     formRef.current?.reset();
//     setState({ switcherIsPressed: false });
//     setState({ imagePreviewUrl: '' });
//     setState({ submitted: true });
//   };

//   resetErrors = () => {
//     setState({ formHasError: false });
//     setState({ titleError: '' });
//     setState({ authorError: '' });
//     setState({ bookTypeError: '' });
//     setState({ genresError: '' });
//     setState({ switcherError: '' });
//     setState({ publishedError: '' });
//     setState({ pagesError: '' });
//     setState({ coverError: '' });
//   };

//   validateInput = <K extends keyof State, T>(
//     key: K,
//     value: T,
//     condition: T,
//     errorMessage: string
//   ) => {
//     return new Promise<void>((resolve) => {
//       if (value === condition) {
//         setState({ formHasError: true });
//         setState({ [key]: errorMessage } as Pick<State, K>);
//         setState({ submitted: false }, resolve);
//       } else resolve();
//     });
//   };

// handleimageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const file = event.target.files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setState({ imagePreviewUrl: reader.result as string });
//     };
//     reader.readAsDataURL(file);
//   } else {
//     setState({ imagePreviewUrl: undefined });
//   }
// };

//   render() {
//     const {
//       imagePreviewUrl,
//       titleError,
//       authorError,
//       pagesError,
//       bookTypeError,
//       genresError,
//       switcherError,
//       publishedError,
//       coverError,
//       submitted,
//     } = state;

//     return (
//       <form
//         ref={formRef}
//         data-testid="addBookForm"
//         className={styles['add-book-form']}
//         onSubmit={handleSubmit}
//       >
//         <h2>Add Book</h2>

//         <TextInput
//           className={styles['input-container']}
//           label="Title:"
//           id="title"
//           refer={titleRef}
//         />
//         <ErrorMessage testId="titleError" inputError={titleError} className={styles.error} />

//         <TextInput
//           className={styles['input-container']}
//           label="Author:"
//           id="author"
//           refer={authorRef}
//         />
//         <ErrorMessage testId="authorError" inputError={authorError} className={styles.error} />

//         <div className={styles['space-between']}>
//           <div className={styles['input-container']}>
//             <label htmlFor="bookType">
//               Type:
//               <select id="bookType" defaultValue="default" ref={bookTypeRef}>
//                 <option style={{ display: 'none' }} value="default" disabled>
//                   --Select one--
//                 </option>
//                 <option value="Hardcover">Hardcover</option>
//                 <option value="Paperback">Paperback</option>
//                 <option value="eBook">eBook</option>
//               </select>
//             </label>
//           </div>
//         </div>
//         <ErrorMessage testId="bookTypeError" inputError={bookTypeError} className={styles.error} />

//         <div className={styles.genres}>
//           <label className={styles.stock} htmlFor="stock">
//             Fiction
//             <input id="fiction" type="checkbox" ref={fictionRef} />
//           </label>
//           <label className={styles.stock} htmlFor="stock">
//             Non-Fiction
//             <input id="non-fiction" type="checkbox" ref={nonFictionRef} />
//           </label>
//           <label className={styles.stock} htmlFor="stock">
//             Sci-Fi
//             <input id="sci-fi" type="checkbox" ref={fantasyRef} />
//           </label>
//           <label className={styles.stock} htmlFor="stock">
//             Fantasy
//             <input data-testid="fantasy" id="fantasy" type="checkbox" ref={scifiRef} />
//           </label>
//         </div>
//         <ErrorMessage testId="genresError" inputError={genresError} className={styles.error} />
//         <div className="switch-field">
//           <div className="switch-title">Availabity</div>
//           <input
//             data-testid="inStock"
//             type="radio"
//             id="switch_left"
//             name="switchToggle"
//             value="In Stock"
//             ref={stockRef}
//             onClick={() => {
//               setState({ switcherIsPressed: true });
//             }}
//           />
//           <label htmlFor="switch_left">In Stock</label>

//           <input
//             type="radio"
//             id="switch_right"
//             name="switchToggle"
//             value="Out of Stock"
//             onClick={() => {
//               setState({ switcherIsPressed: true });
//             }}
//             ref={outOfStockRef}
//           />
//           <label htmlFor="switch_right">Out of Stock</label>
//           <ErrorMessage testId="stockError" inputError={switcherError} className={styles.error} />
//         </div>

//         <div>
//           <label className="input-field date" htmlFor="published">
//             Published:
//             <input data-testid="published" id="published" type="date" ref={publishedRef} />
//           </label>
//         </div>
//         <ErrorMessage
//           testId="publishedError"
//           inputError={publishedError}
//           className={styles.error}
//         />
//         <TextInput
//           className={styles['input-container']}
//           label="Page count:"
//           id="pages"
//           refer={pagesRef}
//         />
//         <ErrorMessage testId="pagesError" inputError={pagesError} className={styles.error} />
//         <div className={styles['input-container']}>
//           <label htmlFor="cover">
//             Cover:
//             <input
//               id="cover"
//               type="file"
//               accept="image/*"
//               ref={imageRef}
//               onChange={handleimageChange}
//             />
//             <ErrorMessage testId="coverError" inputError={coverError} className={styles.error} />
//             {imagePreviewUrl && (
//               <div className={styles.preview}>
//                 <img src={imagePreviewUrl} alt="Preview" />
//               </div>
//             )}
//           </label>
//         </div>
//         <div className={styles['button-container']}>
//           <button type="submit">Submit</button>
//         </div>
//         {submitted && <p className={styles.submitted}>Card successfully created</p>}
//       </form>
//     );
//   }
// }

// export default AddBookForm;

import React, { useState, useRef } from 'react';
import styles from './AddBookForm.module.css';
import { FormData } from '../../types/types';
import TextInput, { TextInputProps } from './TextInput';
import ErrorMessage from './ErrorMessage';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (formData: FormData) => void;
}

interface State {
  titleError: string;
  authorError: string;
  imagePreviewUrl: string | undefined;
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

const AddBookForm = ({ onSubmit }: Props) => {
  const [titleError, setTitleError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const [pagesError, setPagesError] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>('');
  const [bookTypeError, setBookTypeError] = useState('');
  const [genresError, setGenresError] = useState('');
  const [switcherIsPressed, setSwitcherIsPressed] = useState(false);
  const [switcherError, setSwitcherError] = useState('');
  const [publishedError, setPublishedError] = useState('');
  const [coverError, setCoverError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formHasError, setFormHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const genres = ['Fiction', 'Non-Fiction', 'Fantasy', 'Sci-Fi'];

  const formSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleimageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(undefined);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      data-testid="addBookForm"
      className={styles['add-book-form']}
    >
      <h2>Add Book</h2>

      <TextInput
        className={styles['input-container']}
        label="Title:"
        id="title"
        name="title"
        register={register}
        // refer={titleRef}
      />
      <ErrorMessage testId="titleError" inputError={titleError} className={styles.error} />
      {errors.title && <div>Must not be empty</div>}
      <TextInput
        className={styles['input-container']}
        label="Author:"
        id="author"
        name="author"
        register={register}
        // refer={authorRef}
      />
      <ErrorMessage testId="authorError" inputError={authorError} className={styles.error} />

      <div className={styles['space-between']}>
        <div className={styles['input-container']}>
          <label htmlFor="bookType">
            Type:
            <select
              id="bookType"
              defaultValue="default"
              {...register('bookType', { required: true })}
            >
              <option style={{ display: 'none' }} value="default" disabled>
                --Select one--
              </option>
              <option value="Hardcover">Hardcover</option>
              <option value="Paperback">Paperback</option>
              <option value="eBook">eBook</option>
            </select>
          </label>
        </div>
      </div>
      <ErrorMessage testId="bookTypeError" inputError={bookTypeError} className={styles.error} />

      {genres.map((item) => (
        <div key={item}>
          <label htmlFor={item}>{item}</label>
          <input
            type="checkbox"
            id={item}
            {...register('genres', { required: true })}
            value={item}
          />
        </div>
      ))}

      <ErrorMessage testId="genresError" inputError={genresError} className={styles.error} />
      <div className="switch-field">
        <div className="switch-title">Availabity</div>
        <input
          data-testid="inStock"
          type="radio"
          id="switch_left"
          value="In Stock"
          {...register('stock', { required: true })}
          onClick={() => {
            setSwitcherIsPressed(true);
          }}
        />
        <label htmlFor="switch_left">In Stock</label>

        <input
          type="radio"
          id="switch_right"
          value="Out of Stock"
          {...register('stock', { required: true })}
          onClick={() => {
            setSwitcherIsPressed(true);
          }}
        />
        <label htmlFor="switch_right">Out of Stock</label>
        <ErrorMessage testId="stockError" inputError={switcherError} className={styles.error} />
      </div>

      <div>
        <label className="input-field date" htmlFor="published">
          Published:
          <input
            data-testid="published"
            id="published"
            type="date"
            {...register('published', { required: true })}
          />
        </label>
      </div>
      <ErrorMessage testId="publishedError" inputError={publishedError} className={styles.error} />
      <TextInput
        className={styles['input-container']}
        label="Page count:"
        id="pages"
        name="pages"
        register={register}
        // refer={pagesRef}
      />
      <ErrorMessage testId="pagesError" inputError={pagesError} className={styles.error} />
      <div className={styles['input-container']}>
        <label htmlFor="cover">
          Cover:
          <input
            id="cover"
            type="file"
            accept="image/*"
            // ref={register}
            {...register('image', { required: true })}
            onChange={handleimageChange}
          />
          <ErrorMessage testId="coverError" inputError={coverError} className={styles.error} />
          {imagePreviewUrl && (
            <div className={styles.preview}>
              <img src={imagePreviewUrl} alt="Preview" />
            </div>
          )}
        </label>
      </div>
      <div className={styles['button-container']}>
        <button type="submit">Submit</button>
      </div>
      {submitted && <p className={styles.submitted}>Card successfully created</p>}
    </form>
  );
};

export default AddBookForm;
