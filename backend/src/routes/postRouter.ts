import express from "express";
import * as postController from "../controllers/postController";
import { protectAuth } from "../middlewares/authMiddleWare";
import { postPolicy } from "../policies/postpolicies";
export const router = express.Router();




// router.route("/:id").delete(protectAuth, postController.deletePost);

router.route('/user/:id').get(protectAuth,postController.getUserPosts)


router.route("/:id").get(postController.getPost);
router.route("/:id").put(protectAuth, postPolicy.update, postController.updatePost);


router.route("/").get(postController.getPosts);
router.route("/").post((req,res,next)=>{
    console.log('you got here')
    next()
},protectAuth, postController.AddPost);
router.route("/:id/comment").post(protectAuth, postController.commentPost);
router.route("/:id/comments").get(postController.getComments);