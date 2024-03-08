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
      ip: '127.0.0.1'
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
  console.log('worker created',this.worker);
  }
  createRouter  = async ()=>{
    this.router = await this.worker.createRouter({mediaCodecs})
  }

  getRouterRtpCapabilities = async ()=>{
    this.rtpCapabilities =  this.router.rtpCapabilities; 
    console.log('rtp capabilities: ', this.rtpCapabilities)
  }

  createTransport = async (type)=>{
    switch(type){
      case "producer":
        [this.producerTransport,this.producerParams] = await getTransport();
        break;
      case "consumer":
        [this.consumerTransport,this.consumerParams] = await getTransport();
        break;
    }
  }

  getTransport = async ()=>{

    let transport = this.router.createWebRtcTransport(tranportOptions);
    console.log('transport: ',transport.id);

    transport.on('dtlsstatechange',dtlsState =>{
      if (dtlsState==='closed') {
        transport.close();
      }
    })
    transport.on('close',()=>{
      console.log('transport closed')
    })
    let transportParams = {
      params: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters
      }
    }
    return [transport,transportParams];
  }
}

module.exports = SFUServer;