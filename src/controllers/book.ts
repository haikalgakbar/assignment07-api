import { Request, Response } from "express";
import { Book } from "../models/book";
import { IBook } from "../interfaces/book";
import { Session } from "../models/session";
import { Borrowed_book } from "../models/borrowed_book";

export const bookController = {
  getBooks: async (req: Request, res: Response) => {
    try {
      const { q } = req.query;

      const querry = q
        ? {
            $or: [
              { title: { $regex: q as string, $options: "i" } },
              { author: { $regex: q as string, $options: "i" } },
            ],
          }
        : {};

      const books = await Book.find(querry);

      return res.status(200).json(books);
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
  },
  getBook: async (req: Request, res: Response) => {
    return res.status(200).json(await Book.findById(req.params.id));
  },
  getBorrowedBooks: async (_: Request, res: Response) => {
    return res.status(200).json(await Borrowed_book.find({}));
  },
  addBook: async (req: Request, res: Response) => {
    const { title, desc, isbn, author, publish_date, language, pages }: IBook =
      req.body;

    const cover_url = req.file?.filename || "";

    console.log(req.body);

    await new Book<IBook>({
      title,
      desc,
      isbn,
      author,
      cover_url,
      publish_date,
      language,
      pages,
      is_available: true,
      created_at: new Date(),
      updated_at: new Date(),
    }).save();

    return res.status(201).json({ msg: "add book success." });
  },
  updateBook: async (req: Request, res: Response) => {
    const { title, desc, isbn, author, cover_url }: IBook = req.body;
    const { id } = req.params;

    await Book.findByIdAndUpdate(
      { _id: id },
      { title, desc, isbn, author, cover_url, updated_at: new Date() }
    );

    return res.status(200).json({ msg: "update book success." });
  },
  deleteBook: async (req: Request, res: Response) => {
    const { id } = req.params;

    await Book.findByIdAndDelete({ _id: id });

    return res.status(200).json({ msg: "delete book success." });
  },
  borrowBook: async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const { token } = req.body;

      const session = await Session.findOne({ token });

      if (!session) return res.status(404).json({ msg: "session not found." });

      await Book.findByIdAndUpdate({ _id: bookId }, { is_available: false });

      await new Borrowed_book({
        borrower: session?.user,
        book: bookId,
        created_at: new Date(),
      }).save();

      return res.status(200).json({ msg: "borrow book success." });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  returnBook: async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const { token } = req.body;

      const session = await Session.findOne({ token });

      if (!session) return res.status(404).json({ msg: "session not found." });

      await Book.findByIdAndUpdate({ _id: bookId }, { is_available: true });

      await Borrowed_book.findOneAndDelete({
        borrower: session?.user,
        book: bookId,
      });

      return res.status(200).json({ msg: "return book success." });
    } catch (err: any) {
      console.log(err.message);
      return res.status(500).json({ msg: err.message });
    }
  },
};
