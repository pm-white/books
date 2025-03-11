// database queries
const db = require("./db");

async function selectAll() {
  const data = await db.many("select * from books");
  return data;
}
module.exports = { selectAll };
