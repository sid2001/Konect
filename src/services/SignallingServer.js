import MediaSoupClient from "./mediasoup-client";

var msc;
var localStream;
var user;
var ssc;
async function messageHandler(e) {
  const json = JSON.parse(e.data);
  console.log('message handler',json);
  switch(json.type){
    case 'ack':{
      // console.log('ss acknowledged.')
      const payload = {
        type:'create_room',
        data:{
          username:ssc._user
        }
      }
      ssc.send(JSON.stringify(payload));
      break;
    }
    case 'room_created':{
      //store
      console.log('room created');
      const roomId = json.data.roomId;
      msc = new MediaSoupClient('producer',this,roomId,this.username,localStream);
      console.log('initialized msc');
      await msc.createDevice();
      await msc.getRtpCapabilites();
      break;
    }
    case 'rtpCapabilities':{
      console.log('received rtp')
      msc.rtpCapabilities = json.data.rtpCapabilities;
      await msc.loadRtpCapabilities();
      await msc.createSendTransport();
      break;
    }
    case 'producerParams':{
      msc.sendTransportParams = json.data.params;
      await msc.createProducerTransport();
      break;
    }
    case 'producerId':{
      console.log('producerId received.');
      msc.producerId = json.data.producerId;
      break;
    }
  }
}
const connectSignallingServer =  ({username,track})=>{
  ssc = new WebSocket(import.meta.env.VITE_SIGNALLING_SERVER_URL);
  console.log(ssc);
  localStream = track;
  ssc.onopen = (event)=>{
    console.log('connected to ss',event);
  }
  ssc.username = username;
  ssc.onmessage = messageHandler;
  ssc.addEventListener('close',()=>{console.log('ss connection closed!')});
  return ssc;
}

export default connectSignallingServer;