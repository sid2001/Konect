import sendButton from '/src/assets/send-button.png';

const InputBox = ()=>{

  return(
    <div className='input-area'>
      <textarea type="text" placeholder='message' />
      <button><img src={sendButton} alt="send" /></button>
    </div>
  )
}

export default InputBox;