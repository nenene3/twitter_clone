import express from 'express'
import * as postController from '../controllers/postController'
import { protectAuth } from '../middlewares/authMiddleWare'
export const router = express.Router()

router.route('/').get(postController.getPosts)
router.route('/').post(postController.AddPost)

router.route('/:id').get(postController.getPost)
router.route('/:id').put(protectAuth,postController.updatePost)
router.route('/:id').delete(protectAuth,postController.deletePost)
