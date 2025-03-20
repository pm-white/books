// database queries
const db = require("./db");

// get all books from the db
async function catalogView() {
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

// insert a book into the db
async function insertBook(
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
  await db.none(
    "insert into books values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [title, first, last, year_published, type, format, num_pages, start, end],
  );
}

// insert a book into the db
async function updateBook(
  title,
  first,
  last,
  year_published,
  type,
  format,
  num_pages,
  start,
  end,
  originalTitle,
) {
  await db.none(
    `update books
        set title = $1
          , author_first = $2
          , author_last = $3
          , year_published = $4
          , type = $5
          , format = $6
          , num_pages = $7
          , start = $8
          , "end" = $9
      where title = $10`,
    [
      title,
      first,
      last,
      year_published,
      type,
      format,
      num_pages,
      start,
      end,
      originalTitle,
    ],
  );
}

// get the titles of books
async function selectAllTitles() {
  const data = await db.many("select title from books order by title");
  return data;
}

// get book info for updating
async function getBookInfo(title) {
  const data = await db.one("select * from books where title = $1", [title]);
  return data;
}

// get book info for updating
async function deleteBook(title) {
  const data = await db.none("delete from books where title = $1", [title]);
  return data;
}

module.exports = {
  catalogView,
  insertBook,
  selectAllTitles,
  getBookInfo,
  updateBook,
  deleteBook,
};
