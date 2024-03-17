
import express from "express";
import auth from '../../middleware/auth.middleware.js';
import { createPost, getPost, getAllPosts, createLikeToPost, updatePost, createComment } from './post_controller.js'
import endPoints from "../../middleware/endPoints.js";

const router = express.Router();

router.post('/addPost', auth(endPoints.allUsersExceptAdmin), createPost);
router.get('/user/post/get/:id', getPost);
router.get('/getAllPosts', auth(endPoints.admin), getAllPosts);
router.patch('/addLike', auth(endPoints.allUsersExceptAdmin), createLikeToPost);
router.patch('/updatePost/:id', auth(endPoints.allUsersExceptAdmin), updatePost);
router.patch('/addComment/:id', auth(endPoints.allUsersExceptAdmin), createComment);

export default router;