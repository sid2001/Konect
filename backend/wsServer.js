/* eslint-disable no-undef */
const ws = require('ws');
const clientAuth = require('./utilities/scripts/sessionAuth');
var sessionHandle;
const heartbeat = (ws) => {
  console.log('heartbeat');
  // console.log(this);
  ws.isAlive = true;
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
        ws.username = data.username;
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

const WebSocketServe = (request,socket,head,httpsServer,sessionHandler)=>{

  sessionHandle = sessionHandler;
  const wss = new ws.WebSocketServer({
    verifyClient: verifyClient,
    // server:httpsServer,
    noServer:true,
    path:'/chat',
    clientTracking:true,

  });
  wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
  })
//   httpsServer.on('upgrade', function upgrade(request, socket, head) {
//     console.log(socket);
//     wss.handleUpgrade(request, socket, head, function done(ws) {
//       wss.emit('connection', ws, request);
// })})
  const interval = setInterval(()=>{
    wss.clients.forEach((sock)=>{
      console.log(wss.clients.size);
      console.log('pinging');
      if(sock.isAlive === false){
        // sock.emit('close');//why not emitting
        // console.log(sock)
        return sock.terminate();
    }

      sock.isAlive = false;
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
  wss.on('connection',(ws,request)=>{

    console.log('ws connection received!!')
    ws.isAlive = true;
    ws.on('error',console.error);
    ws.on('close',()=>{
      clients.delete(ws.username);
      console.log('closed socket');
    })
    ws.on('pong',()=>{
        heartbeat(ws);
      }
    );
    ws.on('message',(m)=>{
      const json = JSON.parse(m);
      messageHandler(json,ws);
    });
    ws.send(JSON.stringify({type:'ack',data:'acknowledged!!'}))
    // cb();
  })
}

module.exports = WebSocketServe;