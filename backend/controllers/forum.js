/* eslint-disable no-undef */
const Post =  require('../models/Posts.js');
const {v4:uuidv4} = require('uuid');
const {ObjectId} = require('mongodb');
const multipart = require('parse-multipart-data');
const {uploadObject} = require('../services/spaces.js');
require('dotenv').config();

const handlePostUpload = async (data,postId)=>{
  var payload = {
    title:'',
    description:'',
    attachment:{images:[]}
  };
  var images = 0;
  for(const element of data) {
    switch(element.name){
      case('title'): {
        payload.title = element.data.toString(); 
        break;
      }
      case('description'): {
        payload.description = element.data.toString(); 
        break;
      }
      case('images[]'): {
        console.log(data);
        const imageType = element.type.split('/')[1];
        const params = {
          Bucket: 'konect',
          Key: `PostImages/${postId}/${++images}.${imageType}`,
          Body: element.data ,
          ACL:'public-read',
          ContentType: `${element.type}`
        }
        try{
          var dat = await uploadObject(params);
          console.log('data from bucket: ',dat);
          const imageLink = `${process.env.SPACES_IMAGE_BASE_ADDR}/${postId}/${images}.${imageType}`;
          payload.attachment.images.push(imageLink);
        }catch(err){
          console.log(err);
          return {err:err,payload:null};
        }
      }
    }
  }
  return {err:'none',payload:payload}
}
const createPost = async (req,res,next)=>{
  const userId = req.userId;
  const postId = uuidv4();
  const username = req.username;

  // document handling still remaining
  try{
    let chunk = 0;
    console.log('headers:',req.headers)
    var buf = Buffer.alloc(0);
    res.setHeader('Content-Type','text/event-stream');//tell the browser that the response is an event stream
    // res.write('data: '+ "hello!\n\n");//this has to be in the first line \n\n signals 
    const boundary = req.headers['content-type'].split(';')[1].split('=')[1];

    req.on('data',(chunks)=>{
      console.log('chunk:',chunk++);
      let length = buf.length + chunks.length;
      buf = Buffer.concat([buf,chunks],length);
    })

    req.on('end',async ()=>{
      const parts = multipart.parse(buf, boundary);
      console.log(parts);
      const {err,payload} = await handlePostUpload(parts,postId);
      if(err!=='none'){
        res.write('failed');
      }else{
        const post = new Post({
          _id: new ObjectId(),
          userData:{
            userId,
            username
          },
          data:payload,
        });
        await post.save();
        res.write('success');
      }
      console.log('end');
      res.end();
    })
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

const likePost = async (req,res)=>{
  try{
    //separate like and dislike logic later to prevent non-idempotency
    const postId = req.params['postId'];
    const post = await Post.findOne({_id:postId});
    if(post.metaData.likedBy.includes(req.user._id)){
      post.metaData.likeCount = post.metaData.likeCount - 1;
      post.metaData.likedBy = post.metaData.likedBy.filter((id)=>id.toString()!==req.user._id.toString());
      await post.save(); 
      console.log('like removed by: ',req.user._id);
      res.status(200).json({type:'success',data:'0'});
    }else{
      post.metaData.likeCount = post.metaData.likeCount + 1;
      post.metaData.likedBy.push(req.user._id);
      await post.save();
      console.log('like added by: ',req.user._id);
      res.status(200).json({type:'success',data:'1'});
    }
  }catch(err){
    res.status(400).json({type:'error',data:"Can't perform the action. Try again later."});
  }
}

module.exports.likePost = likePost;
module.exports.getAllPosts = getAllPosts;
module.exports.createPost = createPost;