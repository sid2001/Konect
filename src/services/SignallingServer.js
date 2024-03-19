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
      if(this.isCaller===true){
        const payload = {
          type:'create_room',
          data:{
            isAudio:this.isAudio,
            username:this.username
          }
        }
        this.send(JSON.stringify(payload));
      }
      else{
        const payload = {
          type:'register_receiver',
          data:{
            isAudio:this.isAudio,
            username:this.username
          }
        }
        this.send(JSON.stringify(payload));
      }
      break;
    }
    case 'room_created':{
      //store
      //notify receiver that room is created
      if(this.isCaller===true){
        const payload = {
          type:'room_created_notify_receiver',
          data:{
            isAudio:this.isAudio,
            receiver:this.receiver,
            roomId:json.data.roomId
          }
        }
        this.send(JSON.stringify(payload));
      }
      console.log('room created');
      const roomId = json.data.roomId;
      msc = new MediaSoupClient('producer',this,roomId,this.username,localStream,this.remoteVideo,this.audioTrack,this.isAudio,this.remoteAudio);
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
      msc.videoProducerIdReceived = true;
      break;
    }
    case 'consumerParams':{
      console.log('consumer params received');
      msc.recvTransportParams = json.data.params;
      await msc.createConsumerTransport();
      break;
    }
    case 'consumerTransportConsume':{
      console.log('consumer tranport consume');
      console.log('consume params: ',json.data);
      await msc.createConsumer(json.data.params);
      
      break;
    }
    default:{
      console.log("Invalid message type: ",json.type);
    }
  }
}
const connectSignallingServer =  ({username,track,receiver,isCaller,remoteVideo,audioTrack,isAudio,remoteAudio})=>{
  ssc = new WebSocket(import.meta.env.VITE_SIGNALLING_SERVER_URL);
  console.log(ssc);
  localStream = track;
  ssc.onopen = (event)=>{
    console.log('connected to ss',event);
  }
  if(isCaller===true)
    ssc.receiver = receiver;//tell both receiver or caller
  else
    ssc.caller = receiver;
  ssc.username = username;
  ssc.isCaller = isCaller;
  ssc.onmessage = messageHandler;
  ssc.remoteVideo = remoteVideo;
  ssc.audioTrack = audioTrack;
  ssc.isAudio = isAudio;
  ssc.remoteAudio = remoteAudio;
  ssc.addEventListener('close',()=>{console.log('ss connection closed!')});
  return ssc;
}

export default connectSignallingServer;