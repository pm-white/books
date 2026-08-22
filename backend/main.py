from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from db_connection import get_db
import model

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/books")
def get_books(db: Session = Depends(get_db)):
    return model.get_books(db)


@app.get("/authors")
def get_authors(db: Session = Depends(get_db)):
    return model.get_authors(db)


@app.get("/topics")
def get_topics(db: Session = Depends(get_db)):
    return model.get_topics(db)


@app.get("/publishers")
def get_publishers(db: Session = Depends(get_db)):
    return model.get_publishers(db)


@app.get("/book-info")
def get_book_info(db: Session = Depends(get_db)):
    return model.get_book_info(db)
