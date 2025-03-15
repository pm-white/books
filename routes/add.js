const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

router.get("/", async function (req, res, next) {
  res.render("add", { title: "Add a Book" });
});

router.post("/", (req, res, next) => {
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
      res.status(200).redirect("/add?=message=Success!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).redirect("/add?=message=Error uploading book.");
    });
});

module.exports = router;
