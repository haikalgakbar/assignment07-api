import mongoose from "mongoose";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  roles?: string;
  email: string;
  password: string;
  user_name: string;
  display_name?: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}
