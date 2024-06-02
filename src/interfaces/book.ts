import mongoose from "mongoose";
export interface IBook {
  _id?: mongoose.Types.ObjectId | string;
  __v?: number;
  title: string;
  desc: string;
  isbn: string;
  author: string;
  publish_date: string;
  language: string;
  cover_url: string;
  pages: number;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
}
