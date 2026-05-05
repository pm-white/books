export interface Book {
  id: number;
  isbn: string;
  title: string;
  subTitle: string | null;
  year: number;
  numPages: number;
  type: string;
  authors: string;
  topics: string | null;
  publisher: string | null;
  startDate: string | null;
  endDate: string | null;
  readingId: number | null;
}

export interface NewBook {
  isbn: string;
  title: string;
  subTitle: string | null;
  year: number;
  numPages: number;
  type: string;
  authors: Author[];
  topics: string[] | null;
  publisher: string;
  startDate: string | null;
  endDate: string | null;
  format: string | null;
}

export interface Author {
  firstName: string;
  middleName: string | null;
  lastName: string;
}
