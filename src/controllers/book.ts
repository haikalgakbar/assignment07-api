import { Request, Response } from "express";
import Book from "../models/book";
import { IBook } from "../interfaces/book";

export const bookController = {
  getBooks: async (req: Request, res: Response) => {
    try {
      const { search } = req.query;

      const querry = search
        ? {
            $or: [
              { name: { $regex: search as string, $options: "i" } },
              { author: { $regex: search as string, $options: "i" } },
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
  addBook: async (req: Request, res: Response) => {
    const { title, desc, isbn, author, qty }: IBook = req.body;

    const cover_url = req.file?.filename || "";

    console.log(req.body);

    await new Book<IBook>({
      title,
      desc,
      isbn,
      author,
      cover_url,
      qty,
      created_at: new Date(),
      updated_at: new Date(),
    }).save();

    return res.status(201).json({ msg: "add book success." });

    // return res.status(201).sendFile(`../public/${req.file?.filename}`);
  },
  // borrowBook: async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const book = await Book.findById(id);

  //     if (book) {
  //       book.qty = book.qty - 1;
  //       await book.save();
  //       return res.status(200).json({ msg: "borrow book success." });
  //     } else {
  //       return res.status(404).json({ msg: "book not found." });
  //     }
  //   } catch (e: any) {
  //     return res.status(500).json({ msg: e.message });
  //   }
  // },
  updateBook: async (req: Request, res: Response) => {
    const { title, desc, isbn, author, cover_url, qty }: IBook = req.body;
    const { id } = req.params;

    await Book.findByIdAndUpdate(
      { _id: id },
      { title, desc, isbn, author, cover_url, qty, updated_at: new Date() }
    );

    return res.status(200).json({ msg: "update book success." });
  },
  deleteBook: async (req: Request, res: Response) => {
    const { id } = req.params;

    await Book.findByIdAndDelete({ _id: id });

    return res.status(200).json({ msg: "delete book success." });
  },
};
