import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { bookRoute } from "./routes/book";
import { userRoute } from "./routes/user";
import { checkForJwt } from "./middlewares/checkForJwt";
import { sessionRoute } from "./routes/session";

mongoose.connect(process.env.MONGO_URI as string);

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use("/", checkForJwt);

app.use(bookRoute);
app.use(userRoute);
app.use(sessionRoute);

app.listen(process.env.PORT);
