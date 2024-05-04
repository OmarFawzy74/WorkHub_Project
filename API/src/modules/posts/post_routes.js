
import express from "express";
import auth from '../../middleware/auth.middleware.js';
import { addPost, getPost, getAllPosts, addLike, updatePost, addComment, uploadPostMedia, removeLike, getUserPosts } from './post_controller.js'
import endPoints from "../../middleware/endPoints.js";
import { postSchema } from "./post.schema.js";
import { validation } from "../../middleware/val.middleware.js";
import { upload } from "../../middleware/uploadImages.js";

const router = express.Router();

router.get('/getAllPosts', getAllPosts); // auth(endPoints.admin)
router.get('/getUserPosts/:id/:role', getUserPosts); // auth(endPoints.admin)
router.post('/addPost', validation(postSchema), addPost); // auth(endPoints.allUsersExceptAdmin)
router.put('/uploadPostMedia/:id', upload.single('media'), uploadPostMedia); // auth(endPoints.allUsersExceptAdmin)
router.put('/addLike/:id', addLike); // auth(endPoints.allUsersExceptAdmin)
router.put('/removeLike/:id', removeLike); // auth(endPoints.allUsersExceptAdmin)
router.put('/addComment/:id', addComment); // auth(endPoints.allUsersExceptAdmin)
router.put('/updatePost/:id', updatePost); // auth(endPoints.allUsersExceptAdmin)


export default router;