// database queries
const db = require("./db");

function select_all() {
  db.many("SELECT * from books")
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}

module.exports = { select_all };
