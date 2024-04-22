const Post =  require('../models/Posts.js');
const multer = require('multer');
const fs = require('fs');
const createPost = async (req,res,next)=>{
  const title = req.body.title;
  const description = req.body.description;
  const images = req.body.images;
  const userId = req.userId;
  const username = req.username;
  // console.log(req.body.images[0]);
  // console.log(req.body);
  // document handling still remaining
  try{
    const post = new Post({
      userData:{
        userId,
        username
      },
      data:{
        title,
        description,
        attachment:{
          images
        }
      }
    });
    await post.save()

    res.status(202).json({type:"success",data:'crated successfully'});
  }catch(err){
    next(err,'Error while creating post');
  }
}

const getAllPosts = async (req,res,next)=>{
  try{
    const posts = await Post.getAllPosts();
    console.log('posts from controller: ',posts);
    res.status(200).json({type:'success',data:posts});
  }catch(err){
    next(err);
  }
}

module.exports.getAllPosts = getAllPosts;
module.exports.createPost = createPost;