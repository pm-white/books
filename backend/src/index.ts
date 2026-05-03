import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Book } from "./types.js";
import { getBooks, testQuery } from "./model.js";

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
        res.status(404).json({ Error: "No boooks in tracker." });
      }
    } catch (e) {
      console.log(e);
    }
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
