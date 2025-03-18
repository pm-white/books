const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

// add a new book
router.post("/", (req, res, next) => {
  console.log("add.js - ADD a book");
  db.none("insert into books values($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
    req.body.title,
    req.body.first_name,
    req.body.last_name,
    req.body.year_published,
    req.body.type,
    req.body.format,
    req.body.num_pages,
    req.body.start,
    req.body.end,
  ])
    .then(() => {
      res.status(200).redirect("/?=message=Success!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).redirect("/?=message=Error uploading book.");
    });
});

// update an existing book
router.post("/update", (req, res) => {
  console.log("add.js - UPDATE book");
});

module.exports = router;
