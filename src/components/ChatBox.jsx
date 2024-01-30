import chatHistory from "../data/chatHistory";
import Card from "./UI/card";

const ChatBox = ()=>{
  let id = 1;
  const chatCard = (data)=>{
    const classname = data.type==='1'?'user-message':'friend-message';
    return(
      <div className={classname}>
        <Card>
        <p className={`${classname}-content`} >
          {data.message}
        </p>
        <div className="footer">
          <div className={`${classname}-time`}>
            {data.time}
          </div>
          <div className={`${classname}-status`}>
            <p>read</p>
          </div>
        </div>
        </Card>
      </div>
    )
  }
  return(
    <div className="ChatContainer">
      <ul>
        <div className="overlay">
        {
        chatHistory().map((data)=>{
          return <li key={id++}>{chatCard(data)}</li>
        })
      }
        </div>
      </ul>
    </div>
  )
}

export default ChatBox;
