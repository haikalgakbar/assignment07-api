import mongoose from "mongoose";
export interface ISession {
  user: mongoose.RefType;
  token: string;
  created_at: Date;
}
