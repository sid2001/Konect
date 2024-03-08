const ws = require('ws');
const EventEmitter = require('node:events');
const SFUServer = require('../medisoupServer');


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
    eventEmitter.emit('createSFU');
  })
  
  eventEmitter.on('createSFU',async ()=>{
    const server = new SFUServer();
  
    await server.createWorker();
    await server.createRouter();
    await server.getRouterRtpCapabilities();
  })
  


// }
//   return serv;
}

module.exports = sfu;