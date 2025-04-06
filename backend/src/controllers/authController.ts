import { Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import User from "../models/UserModel";
import generateToken from "../utils/authUtils";
import { RequestWithUser } from "../middlewares/authMiddleWare";
import { FollowModel } from "../models/FollowModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // Validate required fields
    if (!email || !password || !username) {
      res
        .status(400)
        .json({ message: "Please provide email, password, and username" });
      return;
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Create user (password hashing handled by schema pre-save hook)
    const newUser = await User.create({ email, password, username });

    // Generate token and send response
    generateToken(res, newUser._id);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.username,
        email: newUser.email,
      },
    });
    return;
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "User registration failed" });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.username,
        email: user.email,
      });
      return;
    } else {
      res.status(401);
      res.json({ message: "not loged in" });
      return;
    }
  } catch (e) {
    console.log("heres no user");
    res.json({ a: "asd" });
    return;
  }
};
export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out" });
};

export const getUser = async (req: RequestWithUser, res: Response) => {
  const user = await User.findById(req.user?._id).select("-password");
  res.json(user);
};

export const getcurrentuser = async (req: RequestWithUser, res: Response) => {
  const user = req!.user;
  try {
    const followers = await user?.getFollowersCount();
    const following = await user?.getFollowingCount();
    console.log(user);
    res.json({
      id: user?._id,
      username: user?.username,
      email: user?.email,
      followers,
      following,
    });
  } catch (e) {
    console.log(e);
    res.json({
      id: user?._id,
      username: user?.username,
      email: user?.email,
      followers: -1,
      following: -1,
    });
  }
};

export const logOut = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out" });
};
