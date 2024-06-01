import { Request, Response } from "express";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import User from "../models/user";
import session from "../models/session";
import { ISession } from "../interfaces/session";
import mongoose from "mongoose";

export const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { user_name, email, password } = req.body as IUser;

      if (await User.findOne({ email })) {
        return res.status(400).json({ msg: "email already exists." });
      }

      if (await User.findOne({ user_name })) {
        return res.status(400).json({ msg: "username already exists." });
      }

      await new User<IUser>({
        user_name,
        email,
        password: await bycrypt.hash(password, 12),
        created_at: new Date(),
        updated_at: new Date(),
      }).save();

      return res.status(201).json({
        msg: "create user success.",
      });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const {
        email_or_username,
        password,
      }: { email_or_username: string; password: string } = req.body;

      const user = await User.findOne<IUser>({
        $or: [{ email: email_or_username }, { user_name: email_or_username }],
      });

      if (!user) {
        return res.status(404).json({ msg: "user not found." });
      }

      if (!(await bycrypt.compare(password, user.password))) {
        return res.status(400).json({ msg: "invalid credentials." });
      }

      const token = jwt.sign(
        {
          id: user._id,
          user_name: user.user_name,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
        },
        process.env.JWT_SECRET as string
      );

      await new session<ISession>({
        user: user._id as mongoose.Types.ObjectId,
        token,
        created_at: new Date(),
      }).save();

      return res.status(200).json({
        msg: "login success.",
        data: {
          user: {
            id: user?._id,
            roles: user.roles,
            user_name: user.user_name,
            display_name: user.display_name,
            avatar_url: user.avatar_url,
          },
          token,
        },
      });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
  },

  findUserByEmailOrUsername: async (req: Request, res: Response) => {
    try {
      const { email_or_username } = req.body;
      const user: IUser | null = await User.findOne({
        $or: [{ email: email_or_username }, { user_name: email_or_username }],
      });
      if (!user) {
        return res.status(404).json({ msg: "user not found." });
      }

      return res.status(200).json({ data: user });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
  },

  findUserByEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ msg: "Email alredy in use." });
      }

      return res.status(200).json({ msg: "Email available." });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
  },

  findUserByUsername: async (req: Request, res: Response) => {
    try {
      const { user_name } = req.body;

      if (await User.findOne({ user_name })) {
        return res.status(400).json({ msg: "Username alredy in use." });
      }

      return res.status(200).json({ msg: "Username available." });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
  },
};
