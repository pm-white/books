from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from db_connection import get_db
import model
from type_classes import Book

app = FastAPI()


@app.get("/")
async def root(db: Session = Depends(get_db)):
    data = model.get_homepage_data(db)
    if not data:
        raise HTTPException(status_code=404, detail="No books found.")
    else:
        return data


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
