/* eslint-disable no-undef */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  authType:{
    type:String,
    required:true
  },
  tagname:{
    type:String
  },
  requests:[
    {
      sender:{
        id:{
          type:mongoose.ObjectId,
          ref:'User'
        },
        name:{
          type:String
        },
        username:{
          type:String
        }
      },
      time:{
        type:Date
      }
    }
  ] 
  ,
  email:{
    type: String,
    required:true
  },
  name:{
    first:{
      type:String,
      required:true
    },
    last:{
      type:String
    },
  },
  username:{
    type:String,
    required:true
  },
  passwordHash:{
    type:String,
    required:function(){
      return this.authType==='regular';
    }
  },
  createDate:{
    type: Date,
  },
  // messages:[
  //   {
  //   ref:"Message"
  //   }
  // ],
  contacts:[
    {
      _name:{
        type:String
      },
      _id:{
        type:mongoose.ObjectId
      },
      username:{
        type:String
      }
    }
  ],
  is_active:Boolean,
  
})

userSchema.methods.getContacts = function(){
  return this.contacts;
}
module.exports = mongoose.model('User', userSchema);