import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    pageCount: number;
  };
}

interface HomeBooksState {
  searchValue: string;
  homeBooks: Book[];
  loading: boolean;
  error: string | undefined;
}

export const fetchBooks = createAsyncThunk<Book[], string, { rejectValue: string }>(
  'books/fetchBooks',
  async (searchValue, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&projection=lite&fields=items(id,volumeInfo(title,authors,categories,imageLinks/thumbnail,publishedDate,pageCount))`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      return data.items;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    searchValue: '',
    homeBooks: [],
    loading: false,
    error: undefined,
  } as HomeBooksState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.homeBooks = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const homeBooksActions = bookSlice.actions;

export default bookSlice.reducer;
