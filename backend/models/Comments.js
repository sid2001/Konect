const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId:{
    type:Schema.ObjectId,
    required:true
  },
  comment:{
    type:String,
    required:true,
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
    replyCount:{
      type:Number,
      default:0
    },
  },
  userData:{
    username:{
      type:String,
      required:true
    },
    profilePicture:{
      type:String,
    }
  },
  replies:[
    {
      type:mongoose.ObjectId,
      ref:'Comment'
    }
  ]
})

module.exports = mongoose.model('Comment', commentSchema);
