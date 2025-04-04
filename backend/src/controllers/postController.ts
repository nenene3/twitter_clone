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
  const {id} = req.params
  console.log(req.params)
  console.log(id)
  try{
    console.log(id)
    const posts =await Post.find({author:id}).populate('author')
    if(posts.length){
      res.status(200)
      res.json(posts.reverse())
    }else{
      res.json({message:'user got no posts'})
    }
  }catch(e){
    console.log('lol')
    throw new Error('no posts')
  }
}



export const commentPost = async(req:RequestWithUser,res:Response)=>{
  const {id} = req.params
  const {title,content} = req.body
  const user = req.user as {_id:string}
  const post = await Post.findById(id)
  if(!post){
    res.status(404).json({message:'post not found'})
    return
  }
  const newComment = new Post({
    title,
    content,
    author:user._id,
    replyTo:post._id
  })
  await newComment.save()
  res.status(201).json({message:'comment added'})
}