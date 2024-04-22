const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userData:{
    userId:{
      type:Schema.ObjectId,
      required:true
    },
    username:{
      type:String,
      default:'Anonymous',
    },
    profilePicture:{
      type:String,
    },
  },
  data:{
    title:{
      type:String,
      required:true,
      maxlength: 100,
      minlength:1
    },
    description:{
      type:String,
      maxlength:500
    },
    attachment:{
      images:[{
        type:String
      }],
      documents:[
        {
          type:String
        }
      ]
    }
  },
  metaData:{
    createdTime:{
      type:Date,
      default:Date.now(),
    },
    likeCount:{
      type:Number,
      default:0
    },
    commentCount:{
      type:Number,
      default:0
    },
  },
  comments:[
    {
      type:Schema.ObjectId,
      ref:'Comment'
    }
  ]
})

postSchema.virtual('user_data',{
  ref:'User',
  localField:'userData.userId',
  foreignField:'_id',
  justOne:true
})

postSchema.statics.getAllPosts = async function(){
  try{
  const posts = await this.find({});
  // console.log('posts: ',posts);
  const populatedPost = await Promise.all(
    posts.map(async post=>{
    // console.log('post from model map: ',post);
    const userData =await post.populate('user_data');
    // console.log('userData after populating: ',userData);
    const payload = {
      postId:post._id,
      userId:post.userData.userId,
      userData:userData.userData,
      data:{
        title : post.data.title,
        description : post.data.description,
        attachment : post.data.attachment
      },
      metaData:post.metaData
    };
    // console.log("post payload: ",payload);
    return payload;
  })
  )
  return populatedPost;
}
  catch(err){
    console.error('Error while fetching posts: ',err);
  }
}
module.exports = mongoose.model('Post', postSchema);
