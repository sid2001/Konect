import sendButton from '/src/assets/send-button.png';
import attachButton from '/src/assets/attachment.png';
import smiley from '/src/assets/smiley.png'
import { useContext, useState } from 'react';
import { chatHistoryDispatchContext } from '../Context/ChatContext';

const InputBox = ({dispatchSelectedUser,selectedUserState,user,ws})=>{
  // const [message,setMessage] = useState();
  const message = selectedUserState.messages[selectedUserState.selectedUser];
  const dispatchChatHistory = useContext(chatHistoryDispatchContext);
  const messageHandler = (e)=>{
    dispatchSelectedUser({
      type:'edited_message',
      message:e.target.value
    })
  }
  // console.log(message);
  const sendMessageHandler = ()=>{
    const payload = {
      type:'msg',
      sender:user.username,
      recipient:selectedUserState.selectedUser,
      data:message
    }
    try{
    ws.send(JSON.stringify(payload));
    dispatchChatHistory({
      type:'send_message',
      sender:user.username,
      selectedUser:selectedUserState.selectedUser,
      message:message
    })
    dispatchSelectedUser({
      type:'send_message',
    })
    }catch(err){
    console.error('error sending message!!',err);
    }
  } 

  return(
    <div key={selectedUserState.selectedUser} className='input-area'>
      <img className='smiley' src={smiley} alt="" />
      <img className='attach' src={attachButton} alt="" />
      <textarea 
      autoFocus
      type="text" rows={1} 
      style={{resize:'none'}} 
      placeholder='message' 
      onChange={messageHandler} 
      value={message}
      onKeyUp={(e)=>{if(e.key==="Enter"&&!e.shiftKey){
        e.preventDefault();
        sendMessageHandler();
      }}}
      />
      <button><img className='send' src={sendButton} alt="send" onClick={sendMessageHandler}/></button>
    </div>
  )
}

export default InputBox;