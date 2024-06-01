import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: String, required: true },
  cover_url: { type: String, required: true },
  qty: { type: Number, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

export default model("book_store_book", bookSchema);
