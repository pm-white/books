import { pgTable, text, smallint, integer, date } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  isbn: text().notNull().unique(),
  title: text().notNull(),
  subTitle: text("sub_title"),
  type: text().notNull(),
  year: smallint().notNull(),
  numPages: smallint("num_pages").notNull(),
});

export const authors = pgTable("authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name"),
});

export const topics = pgTable("topics", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  topic: text().notNull().unique(),
});

export const publishers = pgTable("publishers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().unique(),
});

export const readings = pgTable("readings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  format: text(),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
});

export const bookTopics = pgTable("book_topics", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  topicId: integer("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
});

export const bookAuthors = pgTable("book_authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  authorId: integer("author_id")
    .notNull()
    .references(() => authors.id, { onDelete: "cascade" }),
});

export const bookPublishers = pgTable("book_publishers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  publisherId: integer("publisher_id")
    .notNull()
    .references(() => publishers.id, { onDelete: "cascade" }),
});
