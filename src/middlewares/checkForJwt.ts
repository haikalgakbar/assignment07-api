import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function checkForJwt(req: Request, res: Response, next: NextFunction) {
  console.log(req.cookies);
  console.log(req.signedCookies);
  console.log(`${process.env.CLIENT_URL}/login`);
  if (Object.keys(req.cookies).length === 0) {
    next();
  }
  return res.redirect(301, `${process.env.CLIENT_URL}/login`);
}
