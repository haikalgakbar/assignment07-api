import multer from "multer";
import express from "express";
import { bookController } from "../controllers/book";

export const bookRoute = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "./public/imgs/book_cover");
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

bookRoute.get("/api/v1/books", bookController.getBooks);
bookRoute.get("/api/v1/books/borrowed", bookController.getBorrowedBooks);
bookRoute.post(
  "/api/v1/books",
  upload.single("cover_url"),
  bookController.addBook
);
bookRoute.post("/api/v1/books/:id/borrow", bookController.borrowBook);
bookRoute.post("/api/v1/books/:id/return", bookController.returnBook);
bookRoute.get("/api/v1/books/:id", bookController.getBook);
bookRoute.patch("/api/v1/books/:id", bookController.updateBook);
bookRoute.delete("/api/v1/books/:id", bookController.deleteBook);
