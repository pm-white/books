import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getBooks } from "./db/model.js";
import { Book } from "./types.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.json({ Hello: "World", this: "Is TypeScript" });
  }),
);

app.get(
  "/db-test",
  expressAsyncHandler(async (req, res) => {
    let books: Book[] = [];
    try {
      books = await getBooks();
    } catch (e) {
      console.log(e);
    }

    if (books.length >= 1) {
      res.status(200);
      res.json(books);
    } else {
      res.status(404);
      res.json({ Error: "No boooks in tracker." });
    }
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
