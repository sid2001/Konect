import sendButton from '/src/assets/send-button.png';
import attachButton from '/src/assets/attachment.png';
import smiley from '/src/assets/smiley.png'
import { useState } from 'react';
const InputBox = ()=>{
  const [message,setMessage] = useState();
  const messageHandler = (e)=>{
    console.log(e.target.value);
  }
  return(
    <div className='input-area'>
      <img className='smiley' src={smiley} alt="" />
      <img className='attach' src={attachButton} alt="" />
      <textarea type="text" rows={1} style={{resize:'none'}} placeholder='message' onChange={messageHandler}/>
      <button><img className='send' src={sendButton} alt="send" /></button>
    </div>
  )
}

export default InputBox;