import { db } from "./db/connection.js";
import { Book } from "./types.js";
import { eq, sql } from "drizzle-orm";
import {
  books,
  bookAuthors,
  authors,
  bookPublishers,
  publishers,
  bookTopics,
  topics,
  readings,
} from "./db/schema.js";

export async function getBooks(): Promise<Book[]> {
  try {
    const booksList = await db
      .select({
        id: books.id,
        isbn: books.isbn,
        title: books.title,
        subTitle: books.subTitle,
        year: books.year,
        numPages: books.numPages,
        type: books.type,
        authors: sql<string>`string_agg(distinct concat(${authors.firstName}, ' ', ${authors.middleName}, ' ', ${authors.lastName}), ',')`,
        topics: sql<string>`string_agg(distinct ${topics.topic}, ',' order by ${topics.topic})`,
        publisher: publishers.name,
        startDate: readings.startDate,
        endDate: readings.endDate,
        readingId: readings.id,
      })
      .from(books)
      .innerJoin(bookAuthors, eq(bookAuthors.bookId, books.id))
      .innerJoin(authors, eq(authors.id, bookAuthors.authorId))
      .innerJoin(bookPublishers, eq(bookPublishers.bookId, books.id))
      .innerJoin(publishers, eq(publishers.id, bookPublishers.publisherId))
      .leftJoin(bookTopics, eq(bookTopics.bookId, books.id))
      .leftJoin(topics, eq(topics.id, bookTopics.topicId))
      .leftJoin(readings, eq(readings.bookId, books.id))
      .groupBy(
        books.id,
        books.isbn,
        books.title,
        books.subTitle,
        books.year,
        books.numPages,
        books.type,
        publishers.name,
        readings.startDate,
        readings.endDate,
        readings.id,
      );
    return booksList;
  } catch (e) {
    console.error(e);
    return [];
  }
}
