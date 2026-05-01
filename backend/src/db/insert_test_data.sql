truncate table
  books,
  authors,
  topics,
  publishers,
  book_publishers,
  book_topics,
  book_authors,
  readings
cascade
;

insert into books (isbn, title, sub_title, type, year, num_pages)
values 
-- completed
('9780143129745', 'Dancing Bears', 'True Stories of People Nostalgic for Life Under Tyranny', 'Non-Fiction', 2014, 232),
('9780593656136', 'Character Limit', 'How Elon Musk Destroyed Twitter', 'Non-Fiction', 2024, 480),
-- backlog
('9780226837970', 'Inventing the Rennaisance', 'The Myth of a Golden Age', 'Non-Fiction', 2025, 768),
-- currently reading
('9780375507250', 'Cloud Atlas', null, 'Fiction', 2004, 528)
;

insert into authors (first_name, middle_name, last_name)
values ('Ryan', null, 'Mac'),
	('Kate', null, 'Conger'),
	('Witold', null, 'Szabłowski'),
	('Ada', null, 'Palmer'),
	('David', null, 'Mitchell')
;

insert into book_authors (book_id, author_id)
values ((select id from books where title = 'Dancing Bears'), (select id from authors where "last_name" = 'Szabłowski')),
	((select id from books where title = 'Character Limit'), (select id from authors where "last_name" = 'Conger')),
	((select id from books where title = 'Character Limit'), (select id from authors where "last_name" = 'Mac')),
	((select id from books where title = 'Inventing the Rennaisance'), (select id from authors where "last_name" = 'Palmer')),
	((select id from books where title = 'Cloud Atlas'), (select id from authors where "last_name" = 'Mitchell'))
;

insert into topics (topic)
values ('Journalism'),
	('Travel'),
	('Media Studies'),
	('Technology'),
	('Business'),
	('History'),
	('Art History')
;

insert into publishers (name)
values ('Penguin Publishing Group'),
('Penguin Press'),
('University of Chicago Press'),
('Random House')
;

insert into book_publishers (book_id, publisher_id)
values ((select id from books where title = 'Dancing Bears'), (select id from publishers where name = 'Penguin Publishing Group')),
((select id from books where title = 'Character Limit'), (select id from publishers where name = 'Penguin Press')),
((select id from books where title = 'Inventing the Rennaisance'), (select id from publishers where name = 'University of Chicago Press')),
((select id from books where title = 'Cloud Atlas'), (select id from publishers where name = 'Random House'))
;

insert into book_topics (book_id, topic_id)
values ((select id from books where title = 'Dancing Bears'), (select id from topics where "topic" = 'Journalism')),
	((select id from books where title = 'Dancing Bears'), (select id from topics where "topic" = 'Travel')),
	((select id from books where title = 'Character Limit'), (select id from topics where "topic" = 'Technology')),
	((select id from books where title = 'Character Limit'), (select id from topics where "topic" = 'Business')),
	((select id from books where title = 'Inventing the Rennaisance'), (select id from topics where "topic" = 'History')),
	((select id from books where title = 'Inventing the Rennaisance'), (select id from topics where "topic" = 'Art History'))
;

insert into readings (start_date, end_date, format, book_id)
values ('2025-03-24', '2025-04-05', 'book', (select id from books where title = 'Dancing Bears')),
	('2025-10-28', '2025-11-11', 'book', (select id from books where title = 'Character Limit')),
	('2025-03-24', null, 'book', (select id from books where title = 'Cloud Atlas'))
;
