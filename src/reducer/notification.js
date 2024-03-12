export const initialNotificationState = {
  ringing:false,
  peerInfo:{}
}

export const incomingCallReducer = (state,action)=>{
  switch(action.type){
    case 'incoming_call':{
      const s = {
        ringing:true,
        peerInfo:action.peerInfo
      }
      return s;
    }
    case 'rejected_call':{
      const s = {
        ringing:false,
        peerInfo:{}
      }
      return s;
    }
    // case 'failed_call':{
    //   const s = {

    //   }
    // }
    default :{
      console.log("Invalid action, Notification.");
    }
  }
}