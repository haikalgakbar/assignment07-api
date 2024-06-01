import express from "express";
import { sessionController } from "../controllers/session";

export const sessionRoute = express();

sessionRoute.post("/api/v1/auth/session", sessionController.checkForSession);
sessionRoute.delete("/api/v1/auth/session", sessionController.deleteUser);
