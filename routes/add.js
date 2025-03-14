const express = require("express");
const router = express.Router();
const db = require("../db/db");
const queries = require("../db/queries");

router.get("/", async function (req, res, next) {
  res.render("add", { title: "Add a Book" });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
