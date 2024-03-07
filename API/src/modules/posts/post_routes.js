const { auth } = require('../../middleware/auth.middleware');
const endPoint = require('./endpoint');
const { createPost, getPost, getAllPosts, createLikeToPost, updatePost, createComment } = require('./post_controller');



const router=require('express').Router();
router.post('/user/post/create',auth(endPoint.createPost),createPost);
router.get('/user/post/get/:id',getPost)
router.get('/user/post/getallPost',getAllPosts)
router.patch('/user/post/createLikes/:id',auth(endPoint.createlike),createLikeToPost);
router.patch('/user/post/updatePost/:id',auth(endPoint.createlike),updatePost)
router.patch('/user/post/createComment/:id',auth(endPoint.createlike),createComment)

// router.post('/user/post/createnewPost',auth(endPoint.createPost),createPostNew);


module.exports=router;
''