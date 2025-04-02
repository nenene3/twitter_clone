import { Request, Response } from "express";
import User from "../models/UserModel";


export const postPolicy = {
  create: async (req: Request, res: Response) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    return true;
  },
  update: async (req: Request, res: Response) => {
    
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    return true;
  },
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    return true;
  },
};
