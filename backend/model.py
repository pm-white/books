from sqlalchemy import null, select
from sqlalchemy.orm import Session

from schema import Authors, BookInfo, Books, Publishers, Topics
from type_classes import Book


def get_homepage_data(db: Session):
    data = {}
    conditions = [
        (
            "have_read",
            (BookInfo.start_date.is_not(null()) & BookInfo.end_date.is_not(null())),
        ),
        ("to_read", (BookInfo.start_date.is_(null()) & BookInfo.end_date.is_(null()))),
        (
            "reading",
            (BookInfo.start_date.is_not(null()) & BookInfo.end_date.is_(null())),
        ),
    ]
    for type, condition in conditions:
        data[type] = db.execute(select(BookInfo).where(condition)).scalars().all()
    return data


def get_books(db: Session):
    return db.query(Books).all()


def get_authors(db: Session):
    return db.query(Authors).all()


def get_topics(db: Session):
    return db.query(Topics).all()


def get_publishers(db: Session):
    return db.query(Publishers).all()
