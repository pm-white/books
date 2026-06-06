from sqlalchemy.orm import Session, query
from sqlalchemy import select, func
from schema import Books, Authors, Topics, Publishers, BookInfo


def get_books(db: Session):
    return db.query(Books).all()


def get_authors(db: Session):
    return db.query(Authors).all()


def get_topics(db: Session):
    return db.query(Topics).all()


def get_publishers(db: Session):
    return db.query(Publishers).all()


def get_book_info(db: Session):
    return db.query(BookInfo).all()
