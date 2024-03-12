import { useContext } from 'react';
import { dispatchIncomingCallContext, incomingCallContext } from '../Context/ChatContext';
import '/src/styles/notification.css'
const IncomingCall = ({ws})=>{
  const dispatchIncomingCall = useContext(dispatchIncomingCallContext);
  const incomingCall = useContext(incomingCallContext);
  const answerCall = ()=>{

  }
  const rejectCall = ()=>{
    const payload = {
      type:'call_declined',
      peerInfo:incomingCall.peerInfo.username
    }
    ws.send(JSON.stringify(payload));
    dispatchIncomingCall({type:'rejected_call'});
  }
  return(
    <div className="incoming-call-container">
      <div className="caller-detail">
        <img className="caller-pfp" src={incomingCall.peerInfo.pfp||'/src/assets/default-profile.png'} alt="" />
        <div className="caller-name">
          {incomingCall.peerInfo.username || 'Siddharth'}
        </div>
      </div>
      <div className="call-action">
        <img onClick={answerCall} src="/src/assets/answer-call.png" alt="" />
        <img onClick={rejectCall} src="/src/assets/reject-call.png" alt="" />
      </div>
    </div>
  )
}

export default IncomingCall;