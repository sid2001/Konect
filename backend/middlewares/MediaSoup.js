const ws = require('ws');
const EventEmitter = require('node:events');
const SFUServer = require('../medisoupServer');

const signalHandler = (type,)=>{
  
}

const sfu = (request,socket,head,httpsServer) => {
  // const serv = async (req,res,next) =>{
  
  console.log('sfu');
  // console.log(httpsServer);
  const SignallingServer = new ws.WebSocketServer({
    // server:httpsServer,
    noServer:true,
    path:'/sfu',
    clientTracking:true
  })
  const ss = SignallingServer;
  ss.handleUpgrade(request, socket, head, function done(ws) {
      ss.emit('connection', ws, request);
  })
  

    
  const eventEmitter = new EventEmitter();
  SignallingServer.on('connection',(ws)=>{
    console.log('new connection');
    let server;
    eventEmitter.emit('createSFU',server);
  })
  
  eventEmitter.on('createSFU',async (serv)=>{
    const server = new SFUServer();
    serv = server;
    // await server.createWorker();
    // await server.createRouter();
    // await server.getRouterRtpCapabilities();
  })
  


// }
//   return serv;
}

module.exports = sfu;