const ws = require('ws');
const crypto = require('node:crypto');
const EventEmitter = require('node:events');
const SFUServer = require('../medisoupServer');

const rooms = new Map();
const producers = new Map();
const clients = new Map();

const SignallingServer = new ws.WebSocketServer({
  // server:httpsServer,
  noServer:true,
  path:'/sfu',
  clientTracking:true
})
// const intverval = setInterval(()=>{
//   console.log('rooms: ',rooms);
//   console.log('producers: ',producers)
//   console.log('clients: ',clients)
// },2000)
const ss = SignallingServer;
const eventEmitter = new EventEmitter();

async function signallingMessageHandler(data) {
  // console.log(JSON.parse(event.toString('utf8')));
  const json = JSON.parse(data.toString('utf8'));
  const roomId =json?.data?.roomId;
  console.log('roomId: ',roomId)
  let room;
  if(roomId)
    room = rooms.get(roomId)
  // console.log('room: ',room)
  switch(json.type){
    case 'create_room':{
      eventEmitter.emit('createSFU',this);
      break;
    }
    case 'getRtpCapabilities':{
      const payload = {
        type:'rtpCapabilities',
        data:{
          rtpCapabilities:room.rtpCapabilities
        }
      }
      this.send(JSON.stringify(payload));
      break;
    }
    case 'createWebRtcTransport':{
      await room.createTransport(json.data.type);
      const payload = {
        type:'producerParams',
        data:{
          params:room.producerParams
        }
      }
      this.send(JSON.stringify(payload));
      break;
    }
    case 'transportConnect':{
      await room.producerTransportConnect(json.data);
      break;
    }
    case 'transportProduce':{
      const producerId = await room.producerTransportProduce(json.data);
      const payload = {
        type:'producerId',
        data:{
          producerId: producerId
        }
      }
      const username = this.username;
      producers.set(roomId,{
        ...producers.get(roomId),
        [username]:producerId
      })
      this.send(JSON.stringify(payload));
      break;
    }
    default :{
      console.error('invlaid signal type');
    }
  }
}
ss.on('connection',(ws)=>{
  const payload = {
    type:'ack',
    data:{}
  }
  console.log('sfu signalling server connection');
  ws.on('message',signallingMessageHandler);
  ws.on('close',()=>{console.log('ss closed')});
  ws.send(JSON.stringify(payload),()=>{
    console.log('sent ack!');
  });

})
  

eventEmitter.on('createSFU',async (ws)=>{
  const server = new SFUServer();
  const roomId = crypto.randomBytes(16).toString("hex");
  console.log("New room generated. room ID:",roomId);
  rooms.set(roomId,server);
  const payload = {
    type:'room_created',
    data:{
      roomId: roomId
    }
  }
  clients.set(roomId,ws);
  await server.createWorker();
  await server.createRouter();
  await server.getRouterRtpCapabilities();
  // console.log(ws);
  ws.send(JSON.stringify(payload));
})

module.exports = SignallingServer;