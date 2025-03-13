// database queries
const db = require("./db");

// get all books from the db
async function selectAll() {
  const data = await db.many(
    `select title as "Title"
          , concat(author_first, ' ', author_last) as "Author"
          , year_published as "Published"
          , format as "Format"
          , extract(year from "end") as "Year Read"
       from books
      order by author_last, author_first, year_published desc`,
  );
  return data;
}
module.exports = { selectAll };

// insert a book into the db
function insertBook(
  title,
  first,
  last,
  year_published,
  type,
  format,
  num_pages,
  start,
  end,
) {
  db.none("insert into books values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
    title,
    first,
    last,
    year_published,
    type,
    format,
    num_pages,
    start,
    end,
  ]);
}
