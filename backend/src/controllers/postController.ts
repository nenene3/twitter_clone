import { Request, Response } from "express";



export const getPosts = (req: Request, res: Response) => {
  res.json(posts);
};

export const AddPost = (req: Request, res: Response) => {
  const { post } = req.body;

  if (typeof post === "string") {
    posts.push(post);
    res.status(201).json({ message: "Post added" }); // Ensure response after setting status
    return;
  }
  res.status(400).json({ error: "Post must be a string" });
};

export const getPost = (req: Request, res: Response) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === id);
  res.json(post);
};
