drop view if exists book_info;
create view book_info as
select
	b.id,
	b.isbn,
	b.title,
	b.sub_title,
	b.year,
	b.num_pages,
	b.type,
	p.publisher,
	r.start_date,
	r.end_date,
	r.format,
	string_agg(distinct t.topic, ', ' order by t.topic) as topics,
	string_agg(distinct concat_ws(' ', first_name, middle_name, last_name), ', ') as authors
from
	books b
left join book_topics bt on bt.book_id = b.id
left join topics t on t.id = bt.topic_id
left join book_publishers bp on bp.book_id = b.id
left join publishers p on p.id = bp.publisher_id
left join readings r on r.book_id = b.id
left join book_authors ba on ba.book_id = b.id
left join authors a on a.id = ba.author_id
group by
	b.id,
	b.isbn,
	b.title,
	b.sub_title,
	b.year,
	b.num_pages,
	b.type,
	p.publisher,
	r.start_date,
	r.end_date,
	r.format;
