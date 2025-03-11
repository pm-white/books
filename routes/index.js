const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const books = await queries.selectAll();
  console.log(books);
  res.render("index", { title: "Books Catalog", books: books });
});

module.exports = router;
