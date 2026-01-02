import { pgTable, varchar, smallint, integer, date } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  subTitle: varchar("subTitle", { length: 255 }),
  type: varchar("type", { length: 255 }).notNull(),
  year: smallint("year").notNull(),
  numPages: smallint("numPages").notNull(),
});

export const authors = pgTable("authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  middleName: varchar("middleName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
});

export const topics = pgTable("topics", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  topic: varchar("topic", { length: 255 }).notNull(),
});

export const readings = pgTable("readings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate"),
  format: varchar("format", { length: 255 }).notNull(),
  bookId: integer("bookId")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
});

export const bookTopics = pgTable("bookTopics", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer("bookId")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  topicId: integer("topicId")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
});

export const bookAuthors = pgTable("bookAuthors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer("bookId")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  authorId: integer("authorId")
    .notNull()
    .references(() => authors.id, { onDelete: "cascade" }),
});
