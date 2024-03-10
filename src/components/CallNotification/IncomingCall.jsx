import '/src/styles/notification.css'
const IncomingCall = ({callerInfo})=>{
  return(
    <div className="incoming-call-container">
      <div className="caller-detail">
        <img className="caller-pfp" src={callerInfo.pfp||'/src/assets/default-profile.png'} alt="" />
        <div className="caller-name">
          {callerInfo.username || 'Siddharth'}
        </div>
      </div>
      <div className="call-action">
        <img src="/src/assets/answer-call.png" alt="" />
        <img src="/src/assets/reject-call.png" alt="" />
      </div>
    </div>
  )
}

export default IncomingCall;