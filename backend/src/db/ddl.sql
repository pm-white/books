-- TABLES ------------
create table if not exists books (
	id serial not null primary key,
	title varchar(255) not null,
	sub_title varchar(255),
	type varchar(255) not null,
	year smallint not null check (num_pages > 0),
	num_pages smallint not null check (num_pages > 0)
);

create table if not exists authors (
	id serial not null primary key,
	first_name varchar(255) not null,
	middle_name varchar(255),
	last_name varchar(255)
);

create table if not exists topics (
	id serial not null primary key,
	topic varchar(255) not null
);

-- when a book was read
create table if not exists readings (
	id serial not null primary key,
	start_date date not null,
	end_date date,
	format varchar(255) not null,
	book_id int references books(id) on delete cascade
);

create table if not exists book_topics (
	id serial not null primary key,
	book_id int references books(id) on delete cascade,
	topic_id int references topics(id) on delete cascade
);

create table if not exists book_authors (
	id serial not null primary key,
	book_id int references books(id) on delete cascade,
	author_id int references authors(id) on delete cascade
);

-- VIEWS ------------
drop view if exists completed_books; 
create or replace view completed_books as
select
	case
		when b.sub_title is null then b.title
		else concat(b.title, ': ', b.sub_title)
	end as title,
	string_agg(
		case 
			when a.middle_name is null then concat(a.first_name, ' ', a.last_name)
			else concat(a.first_name, ' ', a.middle_name , ' ', a.last_name)
		end,
		', '
		order by a.last_name, a.first_name
	) as author,
	b.year as year_published,
	extract(year from r.end_date)::integer as year_read
from
	books b
left join book_authors ba on b.id = ba.book_id
left join authors a on a.id = ba.author_id
left join readings r on r.book_id = b.id
where
	r.end_date is not null
group by
	b.title, b.sub_title, b.year, r.end_date
order by 
	r.end_date desc
;

drop view if exists currently_reading; 
create or replace view currently_reading as
select
	case
		when b.sub_title is null then b.title
		else concat(b.title, ': ', b.sub_title)
	end as title,
	string_agg(
		case 
			when a.middle_name is null then concat(a.first_name, ' ', a.last_name)
			else concat(a.first_name, ' ', a.middle_name , ' ', a.last_name)
		end,
		', '
		order by a.last_name, a.first_name
	) as author,
	b.year as year_published
from
	books b
left join book_authors ba on b.id = ba.book_id
left join authors a on a.id = ba.author_id
left join readings r on r.book_id = b.id
where
	r.start_date is not null 
	and r.end_date is null
group by
	b.title, b.sub_title, b.year, r.end_date
order by 
	r.end_date desc
;