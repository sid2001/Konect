const router = require('express').Router();
const {getAllPosts,getSinglePost,createPost,updatePost,deletePost} = require('../controllers/forum.js');
const {userAuth} = require('../middlewares/Auth.js');
const upload = require('multer')();

// router.post('/createPost',userAuth,upload.none(),createPost);
router.post('/createPost',userAuth,createPost);

router.get('/getAllPosts',getAllPosts);

module.exports = router;