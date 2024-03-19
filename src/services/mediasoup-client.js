import {Device} from 'mediasoup-client';
let params = {
  // mediasoup params
  encodings: [
    {
      rid: 'r0',
      maxBitrate: 100000,
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r1',
      maxBitrate: 300000,
      scalabilityMode: 'S1T3',
    },
    {
      rid: 'r2',
      maxBitrate: 900000,
      scalabilityMode: 'S1T3',
    },
  ],
  // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
  codecOptions: {
    videoGoogleStartBitrate: 1000
  }
}
class MediaSoupClient {
  constructor(type,ss,roomId,username,localVideoSource,remoteVideo,audioTrack,isAudio,remoteAudio){
    this.type = type;
    this.ss = ss;
    this.producerId = null;
    this.roomId = roomId;
    this.username = username;
    this.params = {track:localVideoSource,...params};
    this.remoteVideo = remoteVideo;
    this.videoProducerIdReceived = false;
    this.audioParams = {track:audioTrack}
    this.isAudio = isAudio;
    this.remoteAudio = remoteAudio;
    // console.log('constructor: ',username);
  }
  createDevice = async ()=>{
    this.device = new Device();
    console.log('device created');
    // const payload = {
    //     type:'getRtpCapabilities',
    //     data:{
    //       roomId:this.roomId
    //     }
    //   }
    // await this.ss.send(JSON.stringify(payload));
  }
  loadRtpCapabilities = async ()=>{
    await this.device.load({
      routerRtpCapabilities:this.rtpCapabilities
    })
    console.log('loaded device rtpCapabilities: ', this.device.rtpCapabilities);
  }
  getRtpCapabilites = async () =>{
    const payload = {
      type:'getRtpCapabilities',
      data :{
        type:this.type,
        roomId:this.roomId,
        // username:this.username
      }
    }
    await this.ss.send(JSON.stringify(payload));
  }
  createSendTransport = async ()=>{
    console.log('createSendTransport: ',this.username);
    const payload = {
      type:'createWebRtcTransport',
      data:{
        type:'producer',
        roomId:this.roomId,
        username:this.username
      }
    }
    this.ss.send(JSON.stringify(payload))
  }

  createProducerTransport = async () => {
    this.producerTransport = this.device.createSendTransport(this.sendTransportParams);
    console.log('created webrtc transport.');
    this.producerTransport.on('connect',async ({dtlsParameters},callback,errback)=>{
      const payload = {
        type:'transportConnect',
        data:{
          type:this.type,
          dtlsParameters:dtlsParameters,
          roomId:this.roomId,
          username:this.username
        }
      }
      try{
        await this.ss.send(JSON.stringify(payload))
        callback()
      }catch(err){
        errback(err)
      }

    })

    this.producerTransport.on('produce',async (parameters,callback,errcheck)=>{
      console.log(parameters);
      const payload = {
        type:'transportProduce',
        data:{
          type:this.type,
          kind:parameters.kind,
          rtpParameters:parameters.rtpParameters,
          appData: parameters.appData,
          roomId:this.roomId,
          username:this.username
        }
      }
      try{
      this.ss.send(JSON.stringify(payload))
      const interval = setInterval(()=>{
        console.log('waiting for producerID');
        if(this.producerId!==null){
          let id = this.producerId;
          callback({id})
          console.log('producer id received: ',this.producerId);
          clearInterval(interval)
          // this.connectSendTransport();
        }
      },1000)
    }catch(err){
      errcheck(err)
    }
    })
    this.connectSendTransport();
  }
  
  connectSendTransport = async () =>{
    if(this.isAudio===true) this.producer = await this.producerTransport.produce(this.audioParams);
    else this.producer = await this.producerTransport.produce(this.params);

    this.producer.on('trackended',()=>{
      console.log('track ended');

      //close video track
    })
    this.producer.on('transportclose',()=>{
    console.log('transport ended');
    //close video track
  })
  this.createRecvTransport();
  }
  
  createRecvTransport = async ()=>{
    const payload = {
      type:'createWebRtcTransport',
      data:{
        type:'consumer',
        roomId:this.roomId,
        username:this.username
      }
    }
    this.ss.send(JSON.stringify(payload))
  }
  createConsumerTransport = async () => {
    this.consumerTransport = this.device.createRecvTransport(this.recvTransportParams);

    this.consumerTransport.on('connect',async ({dtlsParameters},callback,errback)=>{
      const payload = {
        type:'transportRecvConnect',
        data:{
          dtlsParameters:dtlsParameters,
          username:this.username,
          roomId:this.roomId
        }
      }
      try{
        this.ss.send(JSON.stringify(payload));
        callback();
      }catch(err){
        errback(err)
      }
    })
    const producerWaitInterval = setInterval(()=>{
      if(this.videoProducerIdReceived){
        this.connectRecvTransport();
        clearInterval(producerWaitInterval);
      }
    },1000);
    
  }

  connectRecvTransport = async ()=>{
    const payload = {
      type:'consume',
      data:{
        rtpCapabilities:this.device.rtpCapabilities,
        username:this.username,
        roomId:this.roomId
      }
    }
    this.ss.send(JSON.stringify(payload));
  }

  createConsumer = async (param)=>{
    // const param = this.consumerParams;
    this.consumer = await this.consumerTransport.consume({
      id:param.id,
      producerId:param.producerId,
      kind:param.kind,
      rtpParameters:param.rtpParameters
    })
    const {track} = this.consumer;
    console.log('track',track);
    if(this.isAudio===true)
      this.remoteAudio.srcObject = new MediaStream([track]);
    else 
      this.remoteVideo.srcObject = new MediaStream([track]);

    const payload = {
      type:'consumerResume',
      data:{
        roomId:this.roomId,
        username:this.username
      }
    }
    this.ss.send(JSON.stringify(payload));
  }
}

export default MediaSoupClient;