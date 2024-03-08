/* eslint-disable no-undef */
const express = require('express');
const session = require('express-session');
const csrf = require('csrf');
const mongoose = require("mongoose");
const https = require('node:https');
const fs = require('fs');
const url = require('url');
const MongoDBStore = require('connect-mongodb-session')(session);
const wss = require('./wsServer');
const authRoute = require('./routes/auth');
const cors = require('cors');
const User = require('./models/Users');
const sfu = require('./middlewares/MediaSoup.js')
const userRoute = require('./routes/user');
const testRoute = require('./routes/test');
const {OAuth2Client} = require('google-auth-library');
const {redisClient} = require('./redisClient');
const app = express();
require('dotenv').config();
const credentials = {key:fs.readFileSync("./key.pem"),cert:fs.readFileSync("./cert.pem")};
const storeOptions = new MongoDBStore({
  uri:process.env.DBURI,
  databaseName:'technic',
  collection:'user-sessions'
});
const googleAuthClient = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage'
  );
  const sessionOptions = {
    secret:process.env.MYSECRET,
    resave:false,
    saveUninitialized:false,//suggested since it says that user can request parallel
    cookie:{
      secure:true,
      httpOnly:true,
      sameSite:'none',
      expires:new Date(Date.now() + 1 * 3600000),
      maxAge:8*60*60*1000
    },
    store:storeOptions 
  };
  const sessionHandler = session(sessionOptions);
  
  app.use((req,res,next)=>{
  req.googleAuthClient = googleAuthClient;
  req.CLIENT_ID = process.env.CLIENT_ID;
  next();
})
app.use(cors({
  origin:'https://127.0.0.1:5173',
  credentials:true
}));
app.use(sessionHandler);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
  console.log(req.session);
  if(req.session.userId){
    User.findById(req.session.userId)
    .then((user)=>{
      console.log(user)
      if(user==='null'||!user){
        req.username = 'guest' + Math.random();
        req.userType = 0;
        req.isLoggedIn = false;
        console.log('session user not found: ',req.session);
        return next();//NOTE: next('route') will work only in middleware functions that were loaded by using the app.METHOD() or router.METHOD() functions.
        // console.log('helekajl asldftest');
      }
      req.user = user;
      req.userId = user._id;
      req.userType = 1;
      req.username = user.username;
      req.name = user.name;
      req.isLoggedIn = true;
      return next();
    })
    .catch(err=>{
      console.log(err);
      next(new Error('Error while session searching for user!'));
    })
  }
  else {
    req.username = 'guest' + Math.random();
    req.userType = 0;
    req.isLoggedIn = false;
    next();
  }
})

// app.use('/sfu/',sfu(httpsServer))//sfu route implement
app.use('/test',testRoute);
app.use(authRoute);
app.use('/user/',userRoute);
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
        app.server = httpsServer;
        console.log(`Listening to PORT:${process.env.PORT}`);

        httpsServer.on('upgrade', function upgrade(request, socket, head) {
        // console.log(socket);
        const pathname = url.parse(request.url).pathname;
        if(pathname==='/sfu'){
          sfu(request,socket,head,httpsServer)
        }
        else if(pathname==='/chat'){
          wss(request,socket,head,httpsServer,sessionHandler)
        }
        else{
          console.log('invalid ws path')
        }
        // wss.handleUpgrade(request, socket, head, function done(ws) {
        // wss.emit('connection', ws, request);
        })

        // wss(httpsServer,sessionHandler,()=>{console.log('wss attached!!')});
        // sfu(httpsServer);
    }
    );
}).catch(err=>{
  console.err("Error connecting To DB!",err);
})  