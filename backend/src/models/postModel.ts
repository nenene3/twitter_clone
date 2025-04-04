import mongoose from "mongoose";

interface IPost extends mongoose.Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  replyTo: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  likes: mongoose.Schema.Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
