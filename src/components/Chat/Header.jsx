import callIcon from '/src/assets/call.svg';

const Header = ({user,hType,_name,setCallInfo,ws,selectedUserState,setCallStatus})=>{
  const classname = hType==='userHeader'?hType:'friendHeader';
  const  nameclass = hType==='userHeader'?'user-name':'friend-name';
  const picture = hType==='userHeader'?'/src/assets/profile.svg':'/src/assets/friend.svg';
  // console.log('from headher',selectedUserState);
  const callHandler = (e)=>{
    e.preventDefault();
    const payload = {
      type:'connect_call',
      recipient: selectedUserState.selectedUser,
      peerInfo:{
        username:_name,
        pfp:''
      }
    }
    try{
      ws.send(JSON.stringify(payload));
    }catch(err){
      console.error('error making call');
    }
    setCallStatus('calling');
    setCallInfo((s)=>{
      return({
        ...s,
        to:selectedUserState.selectedUser,
        onCall:true
      })
    })
  }
  
  return(
    <div className={classname}>
        <img className = 'profile-pic' src={picture} alt="friend's pic" />{/*To add: alt according to username */}
        <p className={nameclass}>{hType==='friendHeader'?selectedUserState?.selectedUser:_name}</p> 
        {hType==='friendHeader'?(user.username!==selectedUserState.selectedUser?<button onClick={callHandler} className="call-btn"><img src={callIcon} alt="call" /></button>:''):''}
    </div>
  )
}

export default Header;