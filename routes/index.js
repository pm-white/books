const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

/* GET home page. */
router.get("/", async function (req, res, next) {
  req.books = await queries.selectAll();
  req.table_headers = Object.keys(req.books[0]);
  next();
});

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Books Catalog",
    books: req.books,
    headers: req.table_headers,
  });
});

module.exports = router;
