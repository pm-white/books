import { booksList } from "./db/schema.js";
import { db } from "./db/connection.js";
import { Book } from "./types.js";
import { eq } from "drizzle-orm";

export async function getCompletedBooks(): Promise<Book[]> {
  let books: Book[] = [];
  try {
    books = await db
      .select({
        title: booksList.title,
        author: booksList.author,
        yearPublished: booksList.yearPublished,
        yearRead: booksList.yearRead,
      })
      .from(booksList)
      .where(eq(booksList.status, "completed"));
  } catch (e) {
    console.error(e);
  }

  return books;
}

export async function getInProgressBooks(): Promise<Book[]> {
  let books: Book[] = [];
  try {
    books = await db
      .select({
        title: booksList.title,
        author: booksList.author,
      })
      .from(booksList)
      .where(eq(booksList.status, "in progress"));
  } catch (e) {
    console.error(e);
  }

  return books;
}

export async function getBacklogBooks(): Promise<Book[]> {
  let books: Book[] = [];
  try {
    books = await db
      .select({
        title: booksList.title,
        author: booksList.author,
        yearPublished: booksList.yearPublished,
      })
      .from(booksList)
      .where(eq(booksList.status, "backlog"));
  } catch (e) {
    console.error(e);
  }

  return books;
}
