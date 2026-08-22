from pydantic import BaseModel
from datetime import date


class Book(BaseModel):
    id: int
    isbn: str
    title: str
    sub_title: str | None = None
    year: int
    num_pages: int
    type: str
    publisher: str
    start_date: date | None = None
    end_date: date | None = None
    format: str | None = None
    topics: str | None = None
    authors: str
