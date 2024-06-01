import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new Schema<IUser>({
  roles: { type: String, default: "user" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  user_name: { type: String, required: true },
  display_name: { type: String, default: "" },
  avatar_url: { type: String, default: "" },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

export default model("book_store_user", userSchema);
