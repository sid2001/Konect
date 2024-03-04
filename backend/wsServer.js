/* eslint-disable no-undef */
const ws = require('ws');
const clientAuth = require('./utilities/scripts/sessionAuth');
var sessionHandle;
const heartbeat = () => {
  console.log('heartbeat');
  this.isAlive = true;
}
const clients = new Map();

const messageHandler = (data,ws)=>{
  try{
    console.log(data);
    switch(data.type){
      case 'msg':{ 
        console.log('forwarding message to: ',data.recipient);
        clients.get(data.recipient).send(JSON.stringify(data));
        break;
      }
      case 'ack':{
        clients.set(data.username,ws);
        break;
      }
      default :{
        throw Error('Invalid message type: ' + data.type)
      }
    }
  }catch(err){
    console.error(err);
  }
}

const verifyClient = async (info,cb)=>{
  sessionHandle(info.req,{},async ()=>{
    const isAuth = await clientAuth(info.req.session.userId);
    // console.log('isAuth: ', isAuth)
    if(isAuth) {
      cb(true) 
    }
    else{
      cb(false,401,'Unauthorized')
    }
  });
  
}

const WebSocketSever = (httpsServer,sessionHandler,cb)=>{

  sessionHandle = sessionHandler;
  const wss = new ws.WebSocketServer({
    verifyClient: verifyClient,
    server:httpsServer,
    path:'/chat',
    clientTracking:true,

  });
  const interval = setInterval(()=>{
    wss.clients.forEach((sock)=>{
      console.log(wss.clients.size);
      console.log('pinging');
      if(sock.isAlive === false) return sock.terminate();

      // sock.isAlive = false;s
      sock.ping('pinging',()=>{sock.send(JSON.stringify({type:'ping',data:''}))});
      
    });
  },3000)
  
  wss.on('close',()=>{
    clearInterval(interval);
    console.log('WebSocket server closed.');
  })

  // wss.on('listening',(s)=>{
  //   console.log('listening event',s);
  //   cb();
  //  // implement someting in future
  // })
  wss.on('error',console.error);
  wss.on('headers',(header,req)=>{
    //will implement something in future
  })
  wss.on('connection',(ws)=>{

    console.log('ws connection received!!')
    ws.isAlive = true;
    ws.on('error',console.error);
    ws.on('close',()=>{
      console.log('closed socket');
    })
    ws.on('pong',heartbeat);
    ws.on('message',(m)=>{
      const json = JSON.parse(m);
      messageHandler(json,ws);
    });
    ws.send('connection established!!')
    // cb();
  })
}

module.exports = WebSocketSever;