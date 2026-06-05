from sqlalchemy.orm import Session
from schema import Books, Authors, Topics, Publishers


def get_books(db: Session):
    return db.query(Books).all()


def get_authors(db: Session):
    return db.query(Authors).all()


def get_topics(db: Session):
    return db.query(Topics).all()


def get_publishers(db: Session):
    return db.query(Publishers).all()
