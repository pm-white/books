const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const queries = require("../db/queries");

// homepage
router.get(
  "/",
  asyncHandler(async function (req, res) {
    req.books = await queries.catalogView();
    req.tableHeaders = Object.keys(req.books[0]);

    // update placeholder date value for current read
    req.books.map((b) => {
      if (b["Year Read"] === "1900") {
        b["Year Read"] = "In progress";
      }
    });

    res.render("index", {
      title: "Books Catalog",
      books: req.books,
      headers: req.tableHeaders,
    });
  }),
);

// add a new book
router.post("/addBook", (req, res) => {
  res.render("bookForm", { title: "Add a book", action: "addBook" });
});

// update an existing book
router.post(
  "/updateBook",
  asyncHandler(async (req, res) => {
    if (req.body.title !== "") {
      const bookData = await queries.getBookInfo(req.body.title);
      res.render("bookForm", {
        title: "Update a book",
        action: "updateBook",
        bookData: bookData,
      });
    }
  }),
);

// delete a book
router.post("/deleteBook", (req, res) => {
  queries
    .deleteBook(req.body.title)
    .then(() => {
      res.status(200).redirect("/?=message=Success!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).redirect("/?=message=Error deleting book.");
    });
});

module.exports = router;
