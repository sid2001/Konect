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
    mimeType   : "video/VP8",
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
  constructor(){}

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

  createTransport = async (type)=>{
    switch(type){
      case "producer":
        console.log("creating producer transport");
        [this.producerTransport,this.producerParams] = await this.getTransport();
        break;
      case "consumer":
        console.log('creating consumer transport');
        [this.consumerTransport,this.consumerParams] = await this.getTransport();
        break;
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
  producerTransportConnect = async ({dtlsParameters})=>{
    // console.log("DTLS params...",{dtlsParameters});
    // console.log("DTLS params...");
    await this.producerTransport.connect({dtlsParameters});
    console.log('producer transport connected');
  }
  producerTransportProduce = async ({kind,rtpParameters,appData})=>{
    // console.log(this.producerTransport)
    this.producer = await this.producerTransport.produce({
      kind,
      rtpParameters,
    })

    console.log('Producer ID: ',this.producer.id,this.producer.kind);

    this.producer.on('transportclose',()=>{
      console.log('transport for this producer closed', this.producer.id);
      this.producer.close();
    })
    return this.producer.id;
  }
}

module.exports = SFUServer;