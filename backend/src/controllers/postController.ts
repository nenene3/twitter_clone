import { Request, Response } from "express";
import { RequestWithUser } from "../middlewares/authMiddleWare";
import Post from "../models/postModel";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author");
    res.json(posts);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const AddPost = async (req: RequestWithUser, res: Response) => {
  const user = req.user as { _id: string };
  const { title, content} = req.body;

  if (
    typeof title === "string" &&
    typeof content === "string" 
  ) {
    const newPost = new Post({
      title,
      content,
      author: user._id,
    });
    await newPost.save();
    res.status(201).json({ message: "Post added" });
    return;
  }
  res.status(400).json({ error: "Post must be a string" });
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  if (
    typeof title === "string" &&
    typeof content === "string" &&
    typeof author === "string"
  ) {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );
    res.json(post);
    return;
  } else {
    res.status(400).json({ error: "Post must be a string" });
    return;
  }
};

export const getUserPosts = async(req:RequestWithUser,res:Response)=>{
  const {userId} = req.params
  console.log(userId)
  try{
    const posts =await Post.find({author:userId}).populate('author')
    if(posts.length){
      res.status(200)
      res.json(posts)
    }else{
      res.json({message:'user got no posts'})
    }
  }catch(e){
    console.log('lol')
    throw new Error('no posts')
  }
}