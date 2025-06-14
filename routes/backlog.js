const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const queries = require("../db/queries");

router.get(
  "/",
  asyncHandler(async function (req, res, next) {
    req.backlog = await queries.getBacklog();
    req.tableHeaders = ["Title", "Topics"];

    res.render("backlog", {
      title: "Backlog",
      backlog: req.backlog,
      headers: req.tableHeaders,
    });
  }),
);

// add a new book
router.post("/", (req, res) => {
  res.render("backlogForm", {
    title: "Add a book to the backlog",
    action: "addBook",
  });
});

// update a book
router.post(
  "/updateBook",
  asyncHandler(async (req, res) => {
    if (req.body.title !== "") {
      const bookData = await queries.getBacklogBookInfo(req.body.title);
      res.render("backlogForm", {
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
    .deleteBacklogBook(req.body.title)
    .then(() => {
      res.status(200).redirect("/backlog?=message=Success!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).redirect("/backlog?=message=Error deleting book.");
    });
});

module.exports = router;
