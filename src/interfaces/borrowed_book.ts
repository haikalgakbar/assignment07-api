import mongoose from "mongoose";

export interface IBorrowed_book {
  borrower: mongoose.Schema.Types.ObjectId;
  book: mongoose.Schema.Types.ObjectId;
  created_at: Date;
}
