/* eslint-disable no-undef */
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
      ip: '127.0.0.1',
      announcedIp:'127.0.0.1'
    }
  ],
  enableUDP: true,
  enableTCP: true,
  preferUDP: true,
}
class SFUServer {
  constructor(roomId){
    this.roomId = roomId
    this.producerMap = new Map();
    this.consumerMap = new Map();
  }

  async createWorker() {
    this.worker = await mediasoup.createWorker(
    {
      dtlsCertificateFile:'./cert.pem',
      dtlsPrivateKeyFile:'./key.pem',
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
    return this.producerMap.get(username).producer.id;
  }
}

module.exports = SFUServer;