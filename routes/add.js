const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

router.get("/", async function (req, res, next) {
  res.send("add a book");
});

module.exports = router;
