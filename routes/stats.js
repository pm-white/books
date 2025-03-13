const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

router.get("/", async function (req, res, next) {
  res.send("some interesting statistics...");
});

module.exports = router;
