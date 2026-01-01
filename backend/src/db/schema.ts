import {
  pgTable,
  varchar,
  smallint,
  integer,
  date,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const books = pgTable(
  "books",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    subTitle: varchar("subTitle", { length: 255 }),
    type: varchar("type", { length: 255 }).notNull(),
    year: smallint("year").notNull(),
    numPages: smallint("numPages").notNull(),
  },
  (table) => {
    [
      check("year_check", sql(`${table.year} > 0`)),
      check("numPages_check", sql(`${table.numPages} > 0`)),
    ];
  },
);

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

export const book_topics = pgTable("book_topics", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer("bookId")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  topicId: integer("topicId")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
});

export const book_authors = pgTable("book_authors", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bookId: integer("bookId")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  authorId: integer("authorId")
    .notNull()
    .references(() => authors.id, { onDelete: "cascade" }),
});
