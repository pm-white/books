const express = require("express");
const router = express.Router();
const queries = require("../db/queries");
const { requiresAuth } = require("express-openid-connect");

// add a new book
router.post("/", requiresAuth(), (req, res, next) => {
  // place holder dates for in progress books
  if (req.body.end === "") {
    req.body.end = "1900-01-01";
  }

  queries
    .insertBook(
      req.body.title,
      req.body.first_name,
      req.body.last_name,
      req.body.year_published,
      req.body.type,
      req.body.format,
      req.body.num_pages,
      req.body.start,
      req.body.end,
    )
    .then(() => {
      res.status(200).redirect("/?=message=Success!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).redirect("/?=message=Error uploading book.");
    });
});

// update an existing book
router.post("/update", requiresAuth(), (req, res) => {
  queries
    .updateBook(
      req.body.title,
      req.body.first_name,
      req.body.last_name,
      req.body.year_published,
      req.body.type,
      req.body.format,
      req.body.num_pages,
      req.body.start,
      req.body.end,
      req.body.original_title,
    )
    .then(() => {
      res.status(200).redirect("/?=message=Success!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).redirect("/?=message=Error updating book.");
    });
});

module.exports = router;
