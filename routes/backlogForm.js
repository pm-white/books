const express = require("express");
const router = express.Router();
const queries = require("../db/queries");

// add a new book
router.post("/", (req, res) => {
  queries
    .insertBookBacklog(req.body.title, req.body.source, req.body.topics)
    .then(() => {
      res.status(200).redirect("/backlog?=message=Success!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).redirect("/backlog?=message=Error adding book.");
    });
});

module.exports = router;
