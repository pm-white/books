export interface Book {
  title: string;
  author: string;
  yearPublished: number;
  yearRead: number;
  type?: string;
  numPages?: number;
  topics?: string[];
}
