// TODO:
// - modularize the insert function

import { db } from "./db/connection.js";
import { Book, NewBook, Author } from "./types.js";
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

// gets info for all books for the book cards
export async function getBooks(): Promise<Book[]> {
  return await db
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
}

export async function addBook(bookInfo: NewBook) {
  // wrap all the inserts in a single transaction
  await db.transaction(async (tx) => {
    // insert into books
    const insertedBook = await tx
      .insert(books)
      .values({
        isbn: bookInfo.isbn,
        title: bookInfo.title,
        subTitle: bookInfo.subTitle,
        year: bookInfo.year,
        numPages: bookInfo.numPages,
        type: bookInfo.type,
      })
      .returning();

    // insert each author into authors
    let authorIds: number[] = [];
    await Promise.all(
      bookInfo.authors.map(async (author: Author) => {
        const insertedAuthor = await tx
          .insert(authors)
          .values({
            firstName: author.firstName,
            middleName: author.middleName,
            lastName: author.lastName,
          })
          .returning();
        authorIds.push(insertedAuthor[0].id);
      }),
    );

    //insert each author and book id into bookAuthors
    if (authorIds.length > 0) {
      await Promise.all(
        authorIds.map(async (id: number) => {
          await tx.insert(bookAuthors).values({
            bookId: insertedBook[0].id,
            authorId: id,
          });
        }),
      );
    }

    // insert into publishers
    const insertedPublisher = await tx
      .insert(publishers)
      .values({ name: bookInfo.publisher })
      .onConflictDoNothing()
      .returning();

    // insert into bookPublishers
    let pubId: number;
    if (insertedPublisher.length > 0) {
      // use id of inserted publisher
      pubId = insertedPublisher[0].id;
    } else {
      // get id of existing publisher
      const result = await tx
        .select({ id: publishers.id })
        .from(publishers)
        .where(eq(publishers.name, bookInfo.publisher));
      pubId = result[0].id;
    }
    await tx.insert(bookPublishers).values({
      bookId: insertedBook[0].id,
      publisherId: pubId,
    });

    if (bookInfo.topics) {
      // insert into topics
      let topicIds: number[] = [];
      await Promise.all(
        bookInfo.topics.map(async (topicName: string) => {
          const insertedTopic = await tx
            .insert(topics)
            .values({
              topic: topicName,
            })
            .onConflictDoNothing()
            .returning();
          if (insertedTopic.length > 0) {
            topicIds.push(insertedTopic[0].id);
          } else {
            // get id of existing topic
            const result = await tx
              .select({ id: topics.id })
              .from(topics)
              .where(eq(topics.topic, topicName));
            topicIds.push(result[0].id);
          }
        }),
      );

      // insert each author and topic id into bookTopics
      if (topicIds.length > 0) {
        await Promise.all(
          topicIds.map(async (id: number) => {
            await tx.insert(bookTopics).values({
              bookId: insertedBook[0].id,
              topicId: id,
            });
          }),
        );
      }
    }

    // insert into readings
    await tx.insert(readings).values({
      bookId: insertedBook[0].id,
      startDate: bookInfo.startDate,
      endDate: bookInfo.endDate,
      format: bookInfo.format,
    });
  });
}
