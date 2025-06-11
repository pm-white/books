const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

// homepage
router.get("/", async function (req, res, next) {
  req.books = await queries.catalogView();
  req.tableHeaders = Object.keys(req.books[0]);
  req.bookTitles = await queries.selectAllTitles();

  res.render("index", {
    title: "Books Catalog",
    books: req.books,
    headers: req.tableHeaders,
    bookTitles: req.bookTitles,
  });
});

// add a new book
router.post("/addBook", (req, res) => {
  res.render("bookForm", { title: "Add a book", action: "addBook" });
});

// update an existing book
router.post("/updateBook", async (req, res) => {
  if (req.body.bookToEdit !== "") {
    const bookData = await queries.getBookInfo(req.body.bookToEdit);
    res.render("bookForm", {
      title: "Update a book",
      action: "updateBook",
      bookData: bookData,
    });
  }
});

module.exports = router;
