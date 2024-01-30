/* eslint-disable no-undef */
const express = require('express');
const session = require('express-session');
const csrf = require('csrf');
const mongoose = require("mongoose");
const https = require('node:https');
const fs = require('fs');
const MongoDBStore = require('connect-mongodb-session')(session);
const wss = require('./wsServer');
const authRoute = require('./routes/auth');
const cors = require('cors');
require('dotenv').config();
const app = express();
const User = require('./models/Users');

const credentials = {key:fs.readFileSync("./key.pem"),cert:fs.readFileSync("./cert.pem")};
const storeOptions = new MongoDBStore({
  uri:process.env.DBURI,
  databaseName:'technic',
  collection:'user-sessions'
});
const sessionOptions = {
  secret:process.env.MYSECRET,
  resave:false,
  saveUninitialized:false,//suggested since it says that user can request parallel
  cookie:{
    secure:true,
    httpOnly:true,
    sameSite:'none',
    expires:new Date(Date.now() + 1 * 3600000)
  },
  store:storeOptions 
};

app.use(cors({
  origin:'https://127.0.0.1:5173',
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(session(sessionOptions));
app.use((req,res,next)=>{
  console.log(req.session);
  if(req.session.userId){
    User.findById(req.session.userId)
    .then((user)=>{
      req.userId = user._id;
      req.userType = 1;
      req.username = user.username;
      req.name = user.name;
      req.isLoggedIn = true;
      next();
    })
    .catch(err=>{
      console.log(err);
      throw new Error('Error while session searching for user!');
    })
  }
  else {
    req.username = 'guest' + Math.random();
    req.userType = 0;
    req.isLoggedIn = false;
    next();
  }
})

app.use(authRoute);
app.use('/',(req,res,next)=>{
  res.json({'message':'hello'});
  next();
})

app.use((err,req,res,next)=>{
  console.log('inside error middleware.');
  console.log(err);
  res.status(500).send(err);
  next();
})


mongoose.connect(process.env.DBURI,{dbName:'technic'})
.then(()=>{
  console.log("DB CONNECTED");  
  const httpsServer = https.createServer(credentials,app).listen(
    {
      host:process.env.HOST,port:process.env.PORT},
      ()=>{
        console.log(`Listening to PORT:${process.env.PORT}`);
        wss(httpsServer,()=>{console.log('wss attached!!')});
    }
    );
}).catch(err=>{
  console.err("Error connecting To DB!",err);
})  