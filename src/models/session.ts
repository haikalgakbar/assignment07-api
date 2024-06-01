import { Schema, model } from "mongoose";
import { ISession } from "../interfaces/session";

const sessionSchema = new Schema<ISession>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "book_store_user",
    required: true,
  },
  token: { type: String, required: true },
  created_at: { type: Date, required: true },
});

export default model("book_store_session", sessionSchema);
