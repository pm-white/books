create table books (
  title text,
  author_first text,
  author_last text,
  year_published smallint,
  date text,
  format text,
  num_pages smallint,
  start date,
  "end" date
);

create table backlog (
  title text,
  source text,
  topics text
);
