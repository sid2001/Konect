const User = require('../models/Users');
const {generateFromEmail} = require("unique-username-generator");

exports.postTokenLogin = (req,res,next)=>{
  const payload = req.tokenPayload;
  const userData = {
    authType:'google',
    userData:{
      username:generateFromEmail(payload.email,6),
      name:{first:payload.given_name,last:payload.family_name},
      email:payload.email
    },//add email verification too
  }
  User.findOne({
    authType:'google','userData.email':payload.email//also implement some uid 
  })
  .then(user=>{
    if(!user){
      const newUser = new User(userData);
      return newUser.save()
      .then(usr=>{
        console.log('new user registered(google): ',usr);
        return usr;
      })
    }
    else{
      return user
    }
  })
  .then((userdata)=>{
    req.session.authType = 'google';
    req.session.userId = userdata._id;
    req.session.username = userdata.userData.username;
    req.session.isLoggedIn = true;
    req.session.save((err)=>{
      if(err) console.log('error saving session: ',err);
      else console.log('session updated!!');
    })
    const userPayload = {
      isLoggedIn:true,
      userType:1,
      username:userdata.userData.username,
      name:userdata.userData.name,
    }
    res.status(202).json(JSON.stringify(userPayload));
  })
  .catch(err=>{
    console.log('error saving new user!!',err);
  })
}

exports.getUser = (req,res,next)=>{
  const userPayload = {
    isLoggedIn:req.isLoggedIn,
    userType:req.userType,
    username:req.username,
    name:req.name,
  }
  console.log('auth type:',req.get('X-Auth-Type'))
  console.log('jwt token',req.get("Authorization"));
  res.status(200).json(JSON.stringify(userPayload));
  console.log('user info sent');
}

exports.postLogIn = (req,res,next)=>{

  User.findOne(
    {'userData.username':req.body.username,passwordHash:req.body.passwordHash}
  )
  .then(user=>{
    if(!user) next(new Error('Login failed!! Wrong Credentials!!'));
    else{
      req.session.authType = 'regular';
      req.session.userId = user._id;
      req.session.username = user.userData.username;
      req.session.isLoggedIn = true;
      req.session.save(err=>{
        if(err) console.log("Error saving session!!: ",err);
        else console.log("session updated!!");
      })
      const userPayload = {
        isLoggedIn:true,
        userType:1,
        username:user.userData.username,
        name:user.userData.name,
      }
      res.status(202).json(JSON.stringify(userPayload));
    }
  })
  .catch(err=>{
    console.log("Error occurred while searching for user in DB: ",err);
  }) 
}

exports.postRegister = (req,res,next)=>{
  
  User.findOne(
    {$or:[{'userData.username':req.body.username},{'userData.email':req.body.email}]}
  )
  .then(user=>{
    if(user) throw new Error('Credentials not available');
    else{
      const data = {
        authType:'regular',
        passwordHash:req.body.passwordHash,
        userData:{
          name:{
            firstName:req.body.name.first,
            lastName:req.body.name.last
          },
          username:req.body.username,
          email:req.body.email
        }
      }
      const user = new User(data)
      user
      .save()
      .then((user)=>{
        console.log(`New user registered ${user}`);
        return res.status(200).json({'message':'Registered Successfully','param':'type=login'})
      })
      .catch(err=>{
        console.log(`Error in registering user: ${err}`);
        next(err);
      })
    }
  })
  .catch(err=>{
    console.log(`Error:(fix this error statement at './controllers/auth.js/ line 31') ${err}`);
    res.status(409).send('Conflicting Credentials!!');
  })
}

exports.postLogOut = async function(req,res,next) {
  await req.session.destroy();
  res.status(200).json(JSON.stringify({type:'logout',data:"logout successful"}));
}