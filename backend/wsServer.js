/* eslint-disable no-undef */
const ws = require('ws');
const clientAuth = require('./utilities/scripts/sessionAuth');
const heartbeat = (ws) => {
  // console.log('heartbeat');
  // console.log(this);
  ws.isAlive = true;
}
const clients = new Map();

function messageHandler(dat){
  const data = JSON.parse(dat);
  try{
    console.log(data);
    switch(data.type){
      case 'msg':{
        console.log(this.username);
        if(data.recipient!==this.username){
          console.log('forwarding message to: ',data.recipient);
          clients.get(data.recipient).send(JSON.stringify(data));
        }
        break;  
      }
      case 'ack':{
        this.username = data.username;
        console.log('username: ',this.username);
        clients.set(data.username,this);
        break;
      }
      case 'connect_call':{
        const payload = {
          type:'incoming_call',
          peerInfo : {...data.peerInfo},
        }
        try{
        clients.get(data.recipient).send(JSON.stringify(payload));
        this.send(JSON.stringify(
          {
            type:'ringing'
          }
        ))
        }catch(err){
          const payload = {
            type:'connect_call_failed',
          }
          this.send(JSON.stringify(payload));
          console.error(err);
        }
        break;
      }
      case 'call_declined':{
        const payload = {
          type:'call_declined'
        }
        clients.get(data.peerInfo).send(JSON.stringify(payload));
        break;
      }
      case 'call_accepted':{
        const payload = {
          type:'call_accepted'
        }
        clients.get(data.peerInfo).send(JSON.stringify(payload));
        break;
      }
      case 'call_ended':{
        clients.get(data.data.recipient).send(JSON.stringify({...data,data:''}));
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
  const isAuth = await clientAuth(info.req.session.userId);
  if(isAuth) {
    cb(true) 
  }
  else{
    cb(false,401,'Unauthorized')
  }
}


// const WebSocketServe = (request,socket,head,httpsServer,sessionHandler)=>{

  // sessionHandle = sessionHandler;
  const wss = new ws.WebSocketServer({
    verifyClient: verifyClient,
    // server:httpsServer,
    noServer:true,
    path:'/chat',
    clientTracking:true,
  });
const pingHandler = () =>{
  const interval = setInterval(()=>{
    if(clients.size>0)
      // console.log(clients.size);
    clients.forEach((sock)=>{
      // console.log('pinging');
      if(sock.isAlive === false){
        // sock.emit('close');//why not emitting
        // console.log(sock)
        return sock.terminate();
    }

      sock.isAlive = false;
      sock.ping('pinging',()=>{sock.send(JSON.stringify({type:'ping',data:''}))});
      
    });
  },3000)
  return interval;
}
  
  wss.on('close',()=>{
    clearInterval(wss.pinger);
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
    wss.pinger = pingHandler();
    ws.isAlive = true;
    ws.on('error',console.error);
    ws.on('close',(code)=>{
      clients.delete(ws.username);
      console.log('closed socket with code: ',code);
    })
    ws.on('pong',()=>{
        heartbeat(ws);
      }
    );
    ws.on('message',messageHandler)
    //  function (m){
      // const json = JSON.parse(m);
      // messageHandler(this,json,ws);
    // });
    ws.send(JSON.stringify({type:'ack',data:'acknowledged!!'}))
    // cb();
  })
// }

module.exports = wss;