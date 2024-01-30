import callIcon from '../assets/call.svg';


const Header = ({hType,_name,setCallInfo})=>{

  const classname = hType==='userHeader'?hType:'friendHeader';
  const  nameclass = hType==='userHeader'?'user-name':'friend-name';
  const picture = hType==='userHeader'?'/src/assets/profile.svg':'/src/assets/friend.svg'
  console.log(picture);

  const callHandler = (e)=>{
    e.preventDefault();
    setCallInfo((s)=>{
      return({
        ...s,
        onCall:true
      })
    })
  }
  
  return(
    <div className={classname}>
        <img className = 'profile-pic' src={picture} alt="friend's pic" />{/*To add: alt according to username */}
        <p className={nameclass}>{_name}</p> 
        {hType==='friendHeader'?<button onClick={callHandler} className="call-btn"><img src={callIcon} alt="call" /></button>:''}
    </div>
  )
}

export default Header;