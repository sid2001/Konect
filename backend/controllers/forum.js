const Post =  require('../models/Posts.js');
const multipart = require('parse-multipart-data');

function parseMultipartString(multipartString, boundary) {
  const parts = multipartString.split("--"+boundary);
  if(parts[0]===''){
    parts.shift();
  }
  parts.forEach(element => {
    console.log(element);
    console.log('--------------------');
  });
}
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
    // let chunk = 0;
    // let chunkData = '';
    // // const receivedBuffer = [];
    // console.log('headers:',req.headers)
    // const boundary = req.headers['content-type'].split(';')[1].split('=')[1];
    // req.on('data',(chunks)=>{
    //   console.log('chunk:',chunk++);
    //   // console.log(chunks.toString());
    //   // receivedBuffer.push(chunks);
    //   chunkData = chunkData + chunks.toString();
    // })
    // req.on('end',()=>{
    //   console.log('end');
    //   console.log('chunk data:\n',chunkData);
    //   parseMultipartString(chunkData,boundary);
    // })
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