/* eslint-disable no-undef */
const ws = require('ws');

const WebSocketSever = async (httpsServer,cb)=>{

  const wss = new ws.WebSocketServer({
    server:httpsServer,
    path:'/chat',
    clientTracking:true,

  });
  wss.on('listening',(s)=>{
    console.log('listening event',s);
    cb();
    //implement someting in future
  })
  wss.on('error',console.error);
  wss.on('headers',(req,re,s)=>{
    console.log("websocket response",req);
    req.push('Custom:ajlkj');
    // re.client.data="customHeader:'234234";
    // console.log(re);
    // console.log(s);
    //will implement something in future
  })
  wss.on('connection',(ws)=>{

    console.log('ws connection received!!')
    ws.on('error',console.error);

    ws.on('message',(m)=>{console.log('message: ',m)});
    ws.send('connection established!!')
  })
}

module.exports = WebSocketSever;