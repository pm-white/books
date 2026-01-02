drop view if exists "booksList" cascade; 
create or replace view "booksList" as
select
	case
		when b."subTitle" is null then b.title
		else concat(b.title, ': ', b."subTitle")
	end as title,
	string_agg(
		case 
			when a."middleName" is null then concat(a."firstName", ' ', a."lastName")
			else concat(a."firstName", ' ', a."middleName" , ' ', a."lastName")
		end,
		', '
		order by a."lastName", a."firstName"
	) as author,
	b.year as "yearPublished",
	extract(year from r."endDate")::integer as "yearRead",
	case
		when (r."startDate" is not null and r."endDate" is null) then 'in progress'
		when r."endDate" is not null then 'completed'
		else 'backlog'
	end as status
from
	books b
left join "bookAuthors" ba on b.id = ba."bookId"
left join authors a on a.id = ba."authorId"
left join readings r on r."bookId" = b.id
group by
	b.title, b."subTitle", b.year, r."endDate", r."startDate"
order by 
	r."endDate" desc
;

drop view if exists "completedBooks"; 
create or replace view "completedBooks" as
select
	title,
	author,
	"yearPublished",
	"yearRead"
from
	"booksList"
where
	status = 'completed'
;

drop view if exists "backlogBooks"; 
create or replace view "backlogBooks" as
select
	title,
	author,
	"yearPublished"
from
	"booksList"
where
	status = 'backlog'
;

drop view if exists "inProgressBooks"; 
create or replace view "inProgressBooks" as
select
	title,
	author
from
	"booksList"
where
	status = 'in progress'
;
