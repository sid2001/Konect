import { useContext } from "react";
import chatHistory from "../../data/chatHistory";

import Card from "../UI/card";
import { chatHistoryContext } from "../Context/ChatContext";

const chatCard = (data,selectedUser)=>{
  const classname = data.sender===selectedUser?'friend-message':'user-message';
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

const ChatBox = ({selectedUserState})=>{
  const chatHistory = useContext(chatHistoryContext);
  let id = 1;
  return(
    <div className="ChatContainer">
      <ul>
        {
        chatHistory[selectedUserState['selectedUser']]?.map((data)=>{
          return <li key={id++}>{chatCard(data,selectedUserState['selectedUser'])}</li>
        })
      }
      </ul>
    </div>
  )
}

export default ChatBox;
