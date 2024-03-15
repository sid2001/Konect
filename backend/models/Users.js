/* eslint-disable no-undef */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  authType:{
    type:String,
    required:true
  },
  tagname:{//update in registration
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

// const userSchema = new Schema({
//   userData:{
//     username:{
//       type:String,
//       required:true,
//       unique:true // //this only creates an index and not a validator acc to the docs
//     },
//     name:{
//       firstName:{
//         type:String,
//         required:true
//       },
//       lastName:{
//         type:String,
//       }
//     },
//     profilePicture:{
//       type:String
//     },
//     email:{
//       type:String,
//       required:true
//     },
//     age:{
//       type:Number
//     },
//     gender:{
//       type:String,
//     },
//     origin:{
//       type:String
//     },
//     description:{
//       type:String,
//     }
//   },
//   passwordHash:{
//     type:String,
//     required:true
//   },
//   contacts:[
//     {
//       userId:mongoose.ObjectId,
//       username:String
//     }
//   ],
//   metaData:{
//     createdTime:{
//       type:Date,
//       default:Date.now(),
//       required:true
//     }
//   },
//   communityPost:[
//     {
//       type:mongoose.ObjectId,
//       ref:'Post'
//     }
//   ]
//   ,
//   comments:[
//     {
//       type:mongoose.ObjectId,
//       ref:'Comment'
//     }
//   ],
//   callLog:[
//     {
//       callerId:{
//         type:mongoose.ObjectId
//       },
//       time:{
//         type:Date,
//         default:Date.now(),
//       }
//     }
//   ],
//   chats:{
//       type:Map,
//       of: {
//         type:mongoose.ObjectId,
//         ref:'Chat'
//       }
//     }
// })

// userSchema.methods.getContacts = function(){
//   return this.contacts.map(c=>{
//     return c.username
//   })
// }

// userSchema.methods.getContactId = function(username){
//   return this.contacts.find(function(c){
//     return (c.username===username);
//   });
// }

// userSchema.methods.getUserData = function(){
//   return this.userData;
// }

userSchema.statics.getAllUsers = async function(){
  try{
  const users = await this.find({});
  return users.map(user=>{
    const payload = {
      name:user.name,
      username:user.username,
      id : user._id
    }
    return payload;
  })}
  catch(err){
    console.error('Error while fetching users: ',err);
  }
}
module.exports = mongoose.model('User', userSchema);