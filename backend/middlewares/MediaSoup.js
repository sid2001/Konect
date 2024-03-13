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
  // console.log('rooms: ',rooms);
  // console.log('producers: ',producers)
  // console.log('clients: ',clients)
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
      // console.log('username: ',json.data.username); 
      const roomId = crypto.randomBytes(16).toString("hex");
      eventEmitter.emit('createSFU',this,json.data,roomId);
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
    case 'register_receiver':{
      clients.set(json.data.username,this);
      break;
    }
    case 'room_created_notify_receiver':{
      const payload = {
        type:'room_created',
        data:{
          roomId:json.data.roomId
        }
      }
      clients.get(json.data.receiver).send(JSON.stringify(payload));
      break;
    }
    case 'createWebRtcTransport':{
      // console.log('createWebRtcTransport: ',json.data);
      if(json.data.type==='producer'){
      const producerParams = await room.createTransport(json.data.type,json.data.username);
      const payload = {
        type:'producerParams',//send params
        data:{
          params:producerParams
        }
      }
      this.send(JSON.stringify(payload));}
      else if(json.data.type==='consumer'){
        const consumerParams = await room.createTransport(json.data.type,json.data.username);
      const payload = {
        type:'consumerParams',//recv params
        data:{
          params:consumerParams
        }
      }
      this.send(JSON.stringify(payload));}
      }
      break;
    
    case 'transportConnect':{
      await room.producerTransportConnect(json.data);
      break;
    }
    case 'transportProduce':{
      const producerId = await room.producerTransportProduce(json.data);
      console.log('sending producer Id: ',producerId);
      const payload = {
        type:'producerId',
        data:{
          producerId: producerId
        }
      }
      const username = rooms.get(roomId).username;
      // console.log(this.username);
      producers.set(roomId,{
        ...producers.get(roomId),
        [username]:producerId
      })
      this.send(JSON.stringify(payload));
      break;
    }
    case 'transportRecvConnect':{
      await room.transportRecvConnect(json.data)
      break;
    }
    case 'consume':{
      const params = await room.consumerTransportConsume(json.data);
      const payload = {
        type:'consumerTransportConsume',
        data:{
          params
        }
      }
      this.send(JSON.stringify(payload));
      break;
    }
    case 'consumerResume':{
      await room.consumerResume(json.data.username);
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
  

eventEmitter.on('createSFU',async (ws,data,roomId)=>{
  const server = new SFUServer(roomId);
  console.log("New room generated. room ID:",roomId);
  rooms.set(roomId,server);
  const payload = {
    type:'room_created',
    data:{
      roomId: roomId
    }
  }
  clients.set(data.username,ws);
  await server.createWorker();
  await server.createRouter();
  await server.getRouterRtpCapabilities();
  // server.username = data.username;
  // console.log(ws);
  ws.send(JSON.stringify(payload));
})

module.exports = SignallingServer;