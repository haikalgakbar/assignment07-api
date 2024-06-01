import { Schema, model } from "mongoose";
import { IBorrowed_book } from "../interfaces/borrowed_book";

const userSchema = new Schema<IBorrowed_book>({
  borrower: {
    type: Schema.Types.ObjectId,
    ref: "book_store_user",
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "book_store_book",
    required: true,
  },
  created_at: { type: Date, required: true },
});

export default model("book_store_borrowed_book", userSchema);
