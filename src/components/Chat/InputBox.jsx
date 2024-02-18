import sendButton from '/src/assets/send-button.png';
import attachButton from '/src/assets/attachment.png';
import smiley from '/src/assets/smiley.png'
const InputBox = ()=>{

  return(
    <div className='input-area'>
      <img className='smiley' src={smiley} alt="" />
      <img className='attach' src={attachButton} alt="" />
      <textarea type="text" rows={2} style={{resize:'none'}} placeholder='message' />
      <button><img className='send' src={sendButton} alt="send" /></button>
    </div>
  )
}

export default InputBox;