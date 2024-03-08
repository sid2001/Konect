import mediasoupClient from 'mediasoup-client';
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
  constructor(type,ss){
    this.type = type;
    this.ss = ss;
    this.producerId = null;
  }
  createDevice = async ()=>{
    this.device = new mediasoupClient.Device()

    await this.device.load({
      routerRtpCapabilities:this.rtpCapabilities
    })

    console.log('device rtpCapabilities: ', this.device.rtpCapabilities)
  }
  getRtpCapabilites = async () =>{
    const payload = {
      type:'getRtpCapabilities',
      data :{
        type:this.type
      }
    }
    this.ss.send(JSON.stringify(payload))
  }
  createSendTransport = async ()=>{
    const payload = {
      type:'createWebRtcTransport',
      data:{
        type:this.type
      }
    }
    this.ss.send(JSON.stringify(payload))
  }
  
  createProducerTransport = async () => {
    this.producerTransport = this.device.createSendTransport(this.sendTransportParams);

    this.producerTransport.on('connect',async ({dtlsParameters},callback,errback)=>{
      const payload = {
        type:'transportConnect',
        data:{
          type:this.type,
          dtlsParameters:dtlsParameters
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
          appData: parameters.appData
        }
      }
      try{
      this.ss.send(JSON.stringify(payload))
      const interval = setInterval(()=>{
        console.log('waiting for producerID');
        if(this.producerId!==null){
          let id = this.producerId;
          callback({id})
          clearInterval(interval)
        }
      },1000)
    }catch(err){
      errcheck(err)
    }
    })
  }
  
  connectSendTransport = async () =>{
    this.producer = await this.producerTransport.produce(params);

    this.producer.on('trackended',()=>{
      console.log('track ended');

      //close video track
    })
    this.producer.on('transportclose',()=>{
    console.log('transport ended');
    //close video track
  })
  }
  
  createRecvTransport = async ()=>{
    const payload = {
      type:'createWebRtcTransport',
      data:{
        type:this.type,
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
          dtlsParameters:dtlsParameters
        }
      }
      try{
        this.ss.send(JSON.stringify(payload));
        callback();
      }catch(err){
        errback(err)
      }
    })
  }

  connectRecvTransport = async ()=>{
    const payload = {
      type:'consume',
      data:{
        rtpCapabilities:this.device.rtpCapabilities
      }
    }
    this.ss.send(JSON.stringify(payload));
  }

  createConsumer = async ()=>{
    const param = this.consumerParams;
    this.consumer = await this.consumerTransport.consume({
      id:param.id,
      producerId:param.producerId,
      kind:param.kind,
      rtpParameters:param.rtpParameters
    })
  }
}

export default MediaSoupClient;