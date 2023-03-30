export interface FormData {
  title: string;
  author: string;
  bookType: string;
  genres: string[];
  // stock: boolean;
  stock: string;
  published: string;
  pageCount: number;
  // image: string | undefined;
  cover: FileList;
}
