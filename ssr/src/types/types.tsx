export interface HomeCard {
  title: string;
  author: string[];
  cover?: string;
  getBookInfo: (bookId: string, bookTitle: string) => Promise<void>;
  id: string;
}

export interface FormCardData {
  title: string;
  author: string;
  bookType?: string;
  genres?: string[];
  stock?: string;
  published?: string;
  pageCount?: number;
  cover?: string;
}

export interface BookInfo {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  infoLink: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    imageLinks: {
      thumbnail: string;
    };
    publishedDate: string;
    pageCount?: number;
    description: string;
  };
}
