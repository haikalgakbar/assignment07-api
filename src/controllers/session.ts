import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Session } from "../models/session";
import mongoose from "mongoose";

interface ICheckUser {
  _id: mongoose.Types.ObjectId;
  user: {
    roles: string;
    email: string;
    user_name: string;
    display_name: string;
    avatar_url: string;
  };
  token: string;
  created_at: Date;
  __v: number;
}

export const sessionController = {
  checkForSession: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const { type } = req.query;

      if (!token) {
        return res.status(401).json({ msg: "unauthorized." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!decoded) {
        return res.status(401).json({ msg: "unauthorized." });
      }

      const session = await Session.findOne({
        token,
      })?.populate<ICheckUser>([
        {
          path: "user",
          transform: (user) => {
            return {
              roles: user.roles,
              email: user.email,
              user_name: user.user_name,
              display_name: user.display_name,
              avatar_url: user.avatar_url,
            };
          },
        },
      ]);

      if (!session) {
        return res.status(401).json({ msg: "unauthorized." });
      }

      if (type === "admin" && session?.user.roles !== "admin") {
        return res.status(401).json({ msg: "unauthorized." });
      }

      if (type === "user" && session?.user.roles !== "user") {
        return res.status(401).json({ msg: "unauthorized." });
      }

      return res.status(200).json({ msg: "authorized.", data: session });
    } catch (error: any) {
      return res.status(401).json({ msg: error.message });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(401).json({ msg: "unauthorized." });
      }

      await Session.findOneAndDelete({ token });

      return res.clearCookie("token").status(201).json({ msg: "deleted." });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  },
};
