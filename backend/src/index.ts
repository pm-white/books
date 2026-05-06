import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Book } from "./types.js";
import { getBooks, addBook, deleteBook } from "./model.js";
import { DatabaseError } from "pg";
import { DrizzleQueryError } from "drizzle-orm/errors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get(
  "/get-books",
  expressAsyncHandler(async (req, res) => {
    let books: Book[];
    try {
      books = await getBooks();
      if (books.length >= 1) {
        res.status(200).json(books);
      } else {
        res.status(400).json({ Error: "No boooks in tracker." });
      }
    } catch (e) {
      console.log(e);
    }
  }),
);

app.post(
  "/add-book",
  expressAsyncHandler(async (req, res) => {
    try {
      await addBook(req.body);
      res.status(201).json({ Success: "Book added." });
    } catch (e) {
      console.log(e);
      // https://github.com/drizzle-team/drizzle-orm/discussions/916#discussioncomment-13854434
      if (e instanceof DrizzleQueryError) {
        if (e.cause instanceof DatabaseError) {
          if (e.cause.code === "23505") {
            res.status(400).json({ Error: "Book already exists." });
          }
        }
      } else {
        res.status(404).json({ Error: "Unable to add book." });
      }
    }
  }),
);

app.delete(
  "/delete/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const result = await deleteBook(Number(req.params.id));
      if (result.length > 0) {
        res.status(200).json({ Success: "Book deleted." });
      } else {
        res.status(404).json({ Success: "Book not found." });
      }
    } catch (e) {
      console.log(e);
      res.status(404).json({ Error: "Unable to add book." });
    }
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
