import { useContext,useEffect,useRef } from "react";
import chatHistory from "../../data/chatHistory";

import Card from "../UI/card";
import { chatHistoryContext } from "../Context/ChatContext";

const chatCard = (data,selectedUser,isLatest)=>{
  const classname = data.sender===selectedUser?'friend-message':'user-message';
  return(
    <div className={`${classname} ${isLatest===true?'latest':null}`}>
      <Card>
      <p className={`${classname}-content`} >
        {data.message}
      </p>
      <div className="footer">
        <div className={`${classname}-time`}>
          {data.time}
        </div>
        {/* <div className={`${classname}-status`}>
          <p>read</p>
        </div> */}
      </div>
      </Card>
    </div>
  )
}

const ChatBox = ({selectedUserState})=>{
  const chatHistory = useContext(chatHistoryContext);
  const messagesEndRef = useRef(null);
  const chatCount = chatHistory[selectedUserState['selectedUser']]?.length;
  let id = 1;

  useEffect(() => {
    // Scrolls to the latest message when component mounts or chat history changes
    scrollToBottom(false);
  }, [chatHistory,selectedUserState]);

  const scrollToBottom = (smoothScroll) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smoothScroll?"smooth":"auto"});
  };

  return(
    <div className="ChatContainer">
      <ul>
        {
        chatHistory[selectedUserState['selectedUser']]?.map((data)=>{
          if(chatCount===id)
            return <li ref = {messagesEndRef} key={id++}>{chatCard(data,selectedUserState['selectedUser'],true)}</li>
          else 
            return <li key={id++}>{chatCard(data,selectedUserState['selectedUser'],false)}</li>
        })
      }
      </ul>
      <div />
    </div>
  )
}

export default ChatBox;
