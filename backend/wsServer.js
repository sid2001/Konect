/* eslint-disable no-undef */
const ws = require('ws');

const heartbeat = () => {
  this.isAlive = true;
}

const WebSocketSever = async (httpsServer,cb)=>{

  const wss = new ws.WebSocketServer({
    server:httpsServer,
    path:'/chat',
    clientTracking:true,

  });
  const interval = setInterval(()=>{
    wss.clients.forEach((sock)=>{
      if(sock.isAlive === false) return sock.terminate();

      sock.isAlive = false;
      sock.ping();
    },30000);
  })
  
  wss.on('close',()=>{
    clearInterval(interval);
    console.log('WebSocket server closed.');
  })

  wss.on('listening',(s)=>{
    console.log('listening event',s);
    cb();
    //implement someting in future
  })
  wss.on('error',console.error);
  wss.on('headers',(res,server)=>{
    //will implement something in future
  })
  wss.on('connection',(ws)=>{

    console.log('ws connection received!!')
    ws.isAlive = true;
    ws.on('error',console.error);
    ws.on('pong',heartbeat);
    ws.on('message',(m)=>{console.log('message: ',m)});
    ws.send('connection established!!')
  })
}

module.exports = WebSocketSever;