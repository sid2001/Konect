exports.auth = (req,res,next)=>{
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
}