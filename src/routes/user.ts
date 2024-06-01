import express from "express";
import { userController } from "../controllers/user";

export const userRoute = express();

userRoute.post("/api/v1/auth/signup", userController.createUser);
userRoute.post("/api/v1/auth/login", userController.login);

userRoute.post("/api/v1/user/email", userController.findUserByEmail);
userRoute.post("/api/v1/user/username", userController.findUserByUsername);
userRoute.post(
  "/api/v1/user/email_or_username",
  userController.findUserByEmailOrUsername
);
