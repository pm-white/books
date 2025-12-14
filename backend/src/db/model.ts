import { db } from "./connection.js";
import { Book } from "../types.js";

export async function getBooks(): Promise<Book[]> {
  return db.many("SELECT * FROM completed_books");
}
