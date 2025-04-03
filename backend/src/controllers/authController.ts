import { Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import User from "../models/UserModel";
import generateToken from "../utils/authUtils";
import { RequestWithUser } from "../middlewares/authMiddleWare";

export const register = async (req: Request, res: Response) => {
  
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      res
        .status(401)
        .json({ message: "pls send email and passowrd and username" });
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "user already exists" });
      return;
    }

    const newUser = await User.create({ email, password, username });
    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        message: "user created",
        user: {
          id: newUser._id,
          name: newUser.username,
          email: newUser.email,
        },
      });
    }
  } catch (e) {
    res.status(500).json({ message: "user not created" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email }).select('+password');
    
    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.username,
        email: user.email,
      });
      return
    } else {
      res.status(401);
      res.json({ message: "not loged in" });
      return
    }
  }catch(e){
    console.log('heres no user')
    res.json({a:'asd'})
  }
};
export const logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'logged out' });
};

export const getUser = async (req: RequestWithUser, res: Response) => {

  const user = await User.findById(req.user?._id).select('-password');
  res.json(user);
};

export const getcurrentuser = async (req: RequestWithUser, res: Response) => {
  const user = await User.findById(req.user?._id).select('-password');
  res.json(user);
};

export const logOut = async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'logged out' });
};