// database queries
const db = require("./db");

async function selectAll() {
  const data = await db.many(
    `select title as "Title"
          , concat(author_first, ' ', author_last) as "Author"
          , year_published as "Published"
          , format as "Format"
       from books`,
  );
  return data;
}
module.exports = { selectAll };
