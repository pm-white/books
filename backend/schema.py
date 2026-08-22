from datetime import date
from typing import Optional

from sqlalchemy import TEXT, Date, ForeignKey, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    type_annotation_map = {str: TEXT}
    pass


class Books(Base):
    __tablename__ = "books"

    id: Mapped[int] = mapped_column(primary_key=True)
    isbn: Mapped[str] = mapped_column(unique=True)
    title: Mapped[str]
    sub_title: Mapped[Optional[str]]
    type: Mapped[str]
    year: Mapped[int]
    num_pages: Mapped[int]


class Authors(Base):
    __tablename__ = "authors"
    __table_args__ = (
        UniqueConstraint(
            "first_name",
            "middle_name",
            "last_name",
            name="author_name_unique",
            postgresql_nulls_not_distinct=True,
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str]
    middle_name: Mapped[Optional[str]]
    last_name: Mapped[Optional[str]]


class Topics(Base):
    __tablename__ = "topics"

    id: Mapped[int] = mapped_column(primary_key=True)
    topic: Mapped[str] = mapped_column(unique=True)


class Publishers(Base):
    __tablename__ = "publishers"

    id: Mapped[int] = mapped_column(primary_key=True)
    publisher: Mapped[str] = mapped_column(unique=True)


class Readings(Base):
    __tablename__ = "readings"

    id: Mapped[int] = mapped_column(primary_key=True)
    start_date: Mapped[Optional[date]] = mapped_column(Date)
    end_date: Mapped[Optional[date]] = mapped_column(Date)
    format: Mapped[Optional[str]]
    book_id: Mapped[int] = mapped_column(ForeignKey("books.id", ondelete="CASCADE"))


class BookTopics(Base):
    __tablename__ = "book_topics"
    __table_args__ = (
        UniqueConstraint(
            "book_id",
            "topic_id",
            name="book_topic_unique",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("books.id", ondelete="CASCADE"))
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id", ondelete="CASCADE"))


class BookAuthors(Base):
    __tablename__ = "book_authors"
    __table_args__ = (
        UniqueConstraint(
            "book_id",
            "author_id",
            name="book_author_unique",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("books.id", ondelete="CASCADE"))
    author_id: Mapped[int] = mapped_column(ForeignKey("authors.id", ondelete="CASCADE"))


class BookPublishers(Base):
    __tablename__ = "book_publishers"
    __table_args__ = (
        UniqueConstraint(
            "book_id",
            "publisher_id",
            name="book_publisher_unique",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("books.id", ondelete="CASCADE"))
    publisher_id: Mapped[int] = mapped_column(
        ForeignKey("publishers.id", ondelete="CASCADE")
    )


class BookInfo(Base):
    __tablename__ = "book_info"

    id: Mapped[str] = mapped_column(primary_key=True)
    isbn: Mapped[str]
    title: Mapped[str]
    sub_title: Mapped[str]
    year: Mapped[int]
    num_pages: Mapped[int]
    type: Mapped[str]
    publisher: Mapped[str]
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)
    format: Mapped[str]
    topics: Mapped[str]
    authors: Mapped[str]
