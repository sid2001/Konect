const router = require('express').Router();
const {getAllPosts,getSinglePost,createPost,updatePost,deletePost} = require('../controllers/forum.js');
const {userAuth} = require('../middlewares/Auth.js');

router.post('/createPost',userAuth,createPost);

module.exports = router;