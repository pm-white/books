const express = require("express");
const router = express.Router();
const queries = require("../db/queries");

router.get("/", async function (req, res, next) {
  req.backlog = await queries.getBacklog();
  req.tableHeaders = ["Title", "Topics"];

  res.render("backlog", {
    title: "Backlog",
    backlog: req.backlog,
    headers: req.tableHeaders,
  });
});

// add a new book
router.post("/", (req, res) => {
  res.render("backlogForm", {
    title: "Add a book to the backlog",
  });
});

module.exports = router;
