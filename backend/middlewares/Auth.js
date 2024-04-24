const jwt = require('jsonwebtoken');
require('dotenv').config();

const userAuth = (req,res,next)=>{
  const authType = req.get('X-Auth-Type');
  switch(authType){
    case 'jwt':{
      const token = req.get('Authorization');
      jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
        if(err) res.status(401).json({'message':'Not Authorized'})
        else{
          req.username = decoded.username;
          next();
        }
      })
      break;
    }
    case 'session':{
      try{
        if(req.isLoggedIn===true){
          next()
        }
        else{
          res.status(401).json({'message':'Not Authorized'})
        }
      }
      catch(err){
        next(err);
      }
      break;
    }
    default :{
      res.status(401).json({'message':'Invalid Auth type or missing'});
    }
  }
 
}


module.exports.userAuth = userAuth