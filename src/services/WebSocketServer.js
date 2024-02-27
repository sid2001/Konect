// import WebSocket from 'ws';

const messageHandler = (data,dispatchChatHistory)=>{
  console.log('incoming message: ',data);
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
        console.log('pinging!!');
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

const connectChat = (username,dispatchChatHistory)=>{
  const ws = new WebSocket("wss://127.0.0.1:8081/chat")

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
    const json = JSON.parse(e.data);
    messageHandler(json,dispatchChatHistory);
  }catch(err){
    console.log(err);
  }
}
ws.addEventListener('ping',heartbeat);
return ws;
}

export default connectChat;