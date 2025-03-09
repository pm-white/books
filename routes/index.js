const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("DB: ", db);

  const records = queries.select_all();
  console.log(typeof records);
  console.log(records);

  res.render("index", { title: "Books Catalog", records: records });
});

module.exports = router;
