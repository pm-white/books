truncate table
  books,
  authors,
  topics,
  "bookTopics",
  "bookAuthors",
  readings
cascade
;

insert into books (title, "subTitle", type, year, "numPages")
values 
-- completed
('Dancing Bears', 'True Stories of People Nostalgic for Life Under Tyranny', 'Non-Fiction', 2014, 232),
('Character Limit', 'How Elon Musk Destroyed Twitter', 'Non-Fiction', 2024, 480),
-- backlog
('Inventing the Rennaisance', 'The Myth of a Golden Age', 'Non-Fiction', 2025, 768),
-- currently reading
('Cloud Atlas', null, 'Fiction', 2004, 528)
;

insert into authors ("firstName", "middleName", "lastName")
values ('Ryan', null, 'Mac'),
	('Kate', null, 'Conger'),
	('Witold', null, 'Szabłowski'),
	('Ada', null, 'Palmer'),
	('David', null, 'Mitchell')
;

insert into "bookAuthors" ("bookId", "authorId")
values ((select id from books where title = 'Dancing Bears'), (select id from authors where "lastName" = 'Szabłowski')),
	((select id from books where title = 'Character Limit'), (select id from authors where "lastName" = 'Conger')),
	((select id from books where title = 'Character Limit'), (select id from authors where "lastName" = 'Mac')),
	((select id from books where title = 'Inventing the Rennaisance'), (select id from authors where "lastName" = 'Palmer')),
	((select id from books where title = 'Cloud Atlas'), (select id from authors where "lastName" = 'Mitchell'))
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

insert into "bookTopics" ("bookId", "topicId")
values ((select id from books where title = 'Dancing Bears'), (select id from topics where "topic" = 'Journalism')),
	((select id from books where title = 'Dancing Bears'), (select id from topics where "topic" = 'Travel')),
	((select id from books where title = 'Character Limit'), (select id from topics where "topic" = 'Technology')),
	((select id from books where title = 'Character Limit'), (select id from topics where "topic" = 'Business')),
	((select id from books where title = 'Inventing the Rennaisance'), (select id from topics where "topic" = 'History')),
	((select id from books where title = 'Inventing the Rennaisance'), (select id from topics where "topic" = 'Art History'))
;

insert into readings ("startDate", "endDate", format, "bookId")
values ('2025-03-24', '2025-04-05', 'book', (select id from books where title = 'Dancing Bears')),
	('2025-10-28', '2025-11-11', 'book', (select id from books where title = 'Character Limit')),
	('2025-03-24', null, 'book', (select id from books where title = 'Cloud Atlas'))
;