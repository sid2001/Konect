// import WebSocket from 'ws';
const messageHandler = (data,dispatchChatHistory,dispatchIncomingCall,setCallStatus)=>{
  // console.log('incoming message: ',data);
  try{
    switch(data.type){
      case 'msg':{
        dispatchChatHistory({
          type:'new_message',
          sender:data.sender,
          message:data.data
        })
        break;
      }
      case 'ping':{
        // console.log('pinging!!');
        break;
      }
      case 'ack':{
        console.log('acknowledged');
        break;
      }
      case 'incoming_call':{
        console.log('incomding call from: ',data.peerInfo);
        dispatchIncomingCall({
          type:'incoming_call',
          peerInfo:data.peerInfo
        })
        break;
      }
      case 'connect_call_failed':{
        console.log("call failed");
        setCallStatus('failed');
        break;
      }
      case 'ringing':{
        setCallStatus('ringing');
        break;
      }
      case 'call_declined':{
        console.log('call declined');
        setCallStatus('rejected');
        break;
      }
      case 'call_accepted':{
        console.log('call accepted');
        setCallStatus('accepted');
        break;
      }
      default:{
        throw Error('Invalid message type: ',data.type);
      }
    }
  }catch(err){
    console.error(err);
  }
}
const connectChat = (username,dispatchChatHistory,dispatchIncomingCall,setCallStatus)=>{
  const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL_CHAT)

  const heartbeat = ()=>{
  clearTimeout(this.pingTimeout);
  console.log('pinged!!');
  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 3000 + 1000);
}

ws.addEventListener('open',(e)=>{
  ws.send(JSON.stringify(
    {type:'ack',username:username}
    ));
})
ws.onmessage = (e)=>{
  try{
    // console.log('on message',e.data)
    const json = JSON.parse(e.data);
    messageHandler(json,dispatchChatHistory,dispatchIncomingCall,setCallStatus);
  }catch(err){
    console.log(err);
  }
}
ws.addEventListener('ping',heartbeat);
return ws;
}

export default connectChat;