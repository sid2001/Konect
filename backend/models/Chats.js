const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  senderData:{
    username:{
      type:String,
      reqruied:true
    },
    profilePicture:{
      type:String
    }
  },
  receiverData:{
    username:{
      type:String,
      required:true
    },
    profilePicture:{
      type:String
    }
  },
  message:{
    type:String,
    required:true
  },
  metaData:{
    createdTime:{
      type:Date,
      default:Date.now(),
      required:true
    }
  }
})

module.exports = mongoose.model('Chat',chatSchema);