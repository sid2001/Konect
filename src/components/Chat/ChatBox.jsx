import chatHistory from "../../data/chatHistory";
import Card from "../UI/card";

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

const getUserChat = (id)=>{

}

const ChatBox = ({selectedUser})=>{
  let id = 1;
  return(
    <div className="ChatContainer">
      <ul>
        {
        chatHistory().map((data)=>{
          return <li key={id++}>{chatCard(data)}</li>
        })
      }
      </ul>
    </div>
  )
}

export default ChatBox;
