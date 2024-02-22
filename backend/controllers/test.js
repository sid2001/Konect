const User = require('../models/Users');
const { getUser } = require('./auth');

exports.getAllUsers = (req,res,next)=>{
  const getUsers = new Promise((resolve,reject)=>{
    try{
      User.getAllUsers()
      .then(users=>{
        console.log(users);
        resolve(users);
      });
    }
    catch(err){
      reject(err)
    }
  })
  getUsers
  .then(users=>{
    res.status(200).json({'message':'User data','data':users});
  })
  .catch(console.error)
}