import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: String, required: true },
  publish_date: { type: String, required: true },
  language: { type: String, required: true },
  cover_url: { type: String, required: true },
  pages: { type: Number, required: true },
  is_available: { type: Boolean, required: true, default: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

export const Book = model("book_store_book", bookSchema);
