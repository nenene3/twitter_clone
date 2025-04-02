import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import User, { IUser } from "../models/UserModel";

export interface RequestWithUser extends Request {
  user?: IUser | null;
} 

export const protectAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token;

  token = req.cookies.jwt;
  console.log(req.cookies)
  if (token && typeof token === "string") {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
      if (decoded && typeof decoded === "object" && "userId" in decoded) {
        req.user = await User.findById(decoded.userId);
        next();
      }
    } catch (e) {
      res.status(401);
      res.json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401);
    res.json({ message: "no token" });
  }
};
