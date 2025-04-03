import { Request, Response, NextFunction } from "express";
import User from "../models/UserModel";
import { RequestWithUser } from "../middlewares/authMiddleWare";
import Post from "../models/postModel";

export const postPolicy = {
  update: async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Not authenticated" });
        return
      }

      const post = await Post.findById(req.params.id);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return
      }

      if (post.author.toString() !== (req.user as { _id: string })._id.toString()) {
         res
          .status(403)
          .json({ error: "You are not authorized to update this post" });
          return
      }
    } catch (e) {}
    next()
    
  },
};
