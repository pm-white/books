export interface Book {
  title: string;
  author: string;
  year_published: number;
  year_read: number;
  type?: string;
  num_pages?: number;
  topics?: string[];
}
