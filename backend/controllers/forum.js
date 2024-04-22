const Post =  require('../models/Posts.js');
const createPost = async (req,res,next)=>{
  const title = req.body.title;
  const description = req.body.description;
  const images = req.body.images;
  const userId = req.userId;
  const username = req.username;
  //document handling still remaining
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

module.exports.createPost = createPost;