/* eslint-disable no-undef */
require('dotenv').config();
const mediasoup = require('mediasoup');
const mediaCodecs =
[
  {
    kind        : "audio",
    mimeType    : "audio/opus",
    clockRate   : 48000,
    channels    : 2
  },
  {
    kind       : "video",
    mimeType   : "video/H264",
    clockRate  : 90000,
    parameters :
    {
      "packetization-mode"      : 1,
      "profile-level-id"        : "42e01f",
      "level-asymmetry-allowed" : 1
    }
  }
];
const tranportOptions = {
  listenIps:[
    {
      ip: '0.0.0.0',
      announcedIp:process.env.ANNOUNCED_IP
    }
  ],
  enableUDP: true,
  enableTCP: true,
  preferUDP: true,
}
class SFUServer {
  constructor(roomId,isAudio){
    this.roomId = roomId;
    this.isAudio = isAudio;
    this.producerMap = new Map();
    this.consumerMap = new Map();
  }

  async createWorker() {
    this.worker = await mediasoup.createWorker(
    {
      // dtlsCertificateFile:'./cert.pem',
      // dtlsPrivateKeyFile:'./key.pem',
    }
    
  )
  // console.log('worker created',this.worker);
  console.log('worker created');
  console.log('workder pid: ', this.worker.pid)
  this.worker.on('died', error => {
    console.error('mediasoup worker has died')
    setTimeout(() => process.exit(1), 2000) // exit in 2 seconds
  })
  }
  createRouter  = async ()=>{
    this.router = await this.worker.createRouter({mediaCodecs});
    console.log('router created');
  }

  getRouterRtpCapabilities = async ()=>{
    this.rtpCapabilities =  this.router.rtpCapabilities; 
    // console.log('rtp capabilities set: ', this.rtpCapabilities)
    console.log('rtp capabilities set.');
  }

  createTransport = async (type,username)=>{
    switch(type){
      case "producer":
        console.log("creating producer transport for: ",username);
        var [producerTransport,producerParams] = await this.getTransport();
        console.log(username);
        this.producerMap.set(username,{
          ...this.producerMap.get(username),
          producerTransport:producerTransport,
          producerParams:producerParams
        })

        return producerParams;
      case "consumer":
        console.log('creating consumer transport for: ',username);
        var [consumerTransport,consumerParams] = await this.getTransport();
        this.consumerMap.set(username,{
          ...this.consumerMap.get(username),
          consumerTransport:consumerTransport,
          consumerParams:consumerParams
        })
        return consumerParams;
    }
  }

  getTransport = async ()=>{

    let transport = await this.router.createWebRtcTransport(tranportOptions);
    console.log('transport id: ',transport.id);

    transport.on('dtlsstatechange',dtlsState =>{
      if (dtlsState==='closed') {
        transport.close();
      }
    })
    transport.on('close',()=>{
      console.log('transport closed')
    })
    let transportParams = {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters
    }
    return [transport,transportParams];
  }
  producerTransportConnect = async ({dtlsParameters,username})=>{
    // console.log("DTLS params...",{dtlsParameters});
    // console.log("DTLS params...");
    await this.producerMap.get(username).producerTransport.connect({dtlsParameters});
    console.log('producer transport connected for: ',username);
  }
  producerTransportProduce = async ({kind,rtpParameters,appData,username})=>{
    // console.log(this.producerTransport)
    let producer = await this.producerMap.get(username).producerTransport.produce({
      kind,
      rtpParameters,
    })
    this.producerMap.set(username,{
      ...this.producerMap.get(username),
      producer:producer
    })
    console.log('Producer ID: ',this.producerMap.get(username).producer.id,this.producerMap.get(username).producer.kind);

    producer.on('transportclose',()=>{
      console.log('transport for this producer closed', this.producer.id);
      producer.close();
    })
    // console.log(this.producerMap,this.consumerMap);
    return this.producerMap.get(username).producer.id;
  }
  transportRecvConnect = async ({dtlsParameters,username})=>{
    console.log("consumer DTLS Params received for ",username)
    await this.consumerMap.get(username).consumerTransport.connect({dtlsParameters});
  }
  consumerTransportConsume = async ({rtpCapabilities,username})=>{
    var producerId;
    for(let [key,value] of this.producerMap){
      if(key!==username){
        producerId = value.producer.id;
      }
    }
    try{
      if(this.router.canConsume({
        producerId:producerId,rtpCapabilities
      })){
        var consumer = await this.consumerMap.get(username).consumerTransport.consume({
          producerId:producerId,
          rtpCapabilities,
          paused:true
        })
        this.consumerMap.set(username,{
          ...this.consumerMap.get(username),
          consumer:consumer
        })

        consumer.on('transportclose', () => {
          console.log('transport close from consumer')
        })

        consumer.on('producerclose', () => {
          console.log('producer of consumer closed')
        })

        const params = {
          id: consumer.id,
          producerId: producerId,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        }
        return params;

      }
    }catch (err){
      console.log(err.message);
      return {error:err}
    }
  }
  consumerResume = async (username)=>{
    console.log('consumer resume');
    console.log(this.consumerMap,this.producerMap)
    await this.consumerMap.get(username).consumer.resume();
  }
}

module.exports = SFUServer;