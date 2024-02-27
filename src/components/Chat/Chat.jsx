import ContainerWrapper from "./ContainerWrapper";
import Header from "./Header";
import HeaderWrapper from "./HeaderWrapper";
import ContactsContainer from "./ContactsContainer";
import Contacts from "./Contacts";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";
import CallContainer from "./CallContainer";
import Loader from "../Loader";
import SearchAdd from "./SearchAdd";
import { chatHistoryContext,chatHistoryDispatchContext } from "../Context/ChatContext";
import { useRef,useContext, useState, useEffect, useReducer } from "react";
import { getContacts } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "/src/api/test.js";
import Theme from "../UI/Theme";
import { chatUserStateReducer,initialState } from "../../reducer/chatReducer";
import { chatHistoryReducer, initialChatHistory} from "../../reducer/chatReducer";
import connectChat from '/src/services/WebSocketServer.js'
import dog from '/src/assets/dog.svg';
import '/src/styles/chat.css';

const Chat = ({user})=>{
  const [selectedUserState,dispatchSelectedUser] = useReducer(chatUserStateReducer,initialState);
  const [chatHistory,dispatchChatHistory] = useReducer(chatHistoryReducer,initialChatHistory);
  const [search,setSearch] = useState(false);
  const [contacts,setContacts] = useState('');
  const [clickCount,setClickCount] = useState(0);
  const [ws,setWs] = useState(null);
  const selectedUser = selectedUserState.username;
  const vidRef = useRef(null);
  const navigate = useNavigate();
  console.log('user from chat: ',user);
  useEffect(()=>{
    if(user.isLoggedIn===true){
      console.log('')
      setWs((w)=>{
        if(w!==null){
          console.log('closing ws');
          w.close();
        }
        console.log('openeing ws');
        return connectChat(user.username,dispatchChatHistory);
      });
      return ()=>{
        const wss = ws;
        if(wss!==null)wss.close();
      }
    }
  },[user])
  useEffect(()=>{
    if(user.isLoggedIn===false) navigate('/form?type=login');
    else{
    console.log('fetching contacts')
    // getContacts()
    // .then(data=>{
    //   console.log('recv data: ',data.data);
    //   setContacts(data.data);
    // })
    // .catch(console.error)
    getAllUsers()
    .then(data=>{
      console.log('recv data: ',data.data);
      setContacts(data.data);
    })
    .catch(console.error)
  }
  },[user,navigate])
  const [callInfo,setCallInfo] = useState(
    {
      onCall:false,
      to:'',
    }
  )
  const [windowSize,setWindowSize] = useState({
    width:500,
    height:500
  })
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setClickCount(0);
    },1000);
    if(clickCount===2){
      console.log(vidRef.current.className);
      const theme = Theme(vidRef.current.className);
      console.log(theme.style);
      vidRef.current.style.height = theme.style.height;
      vidRef.current.style.width = theme.style.width;
      vidRef.current.className = theme.className;
    }
    return ()=>{
      clearTimeout(timeout);
    }
  },[clickCount])

  const vidClickHandler = ()=>{
    setClickCount((c)=>c+1);
  }
  return(
    <chatHistoryContext.Provider value={chatHistory}>
      <chatHistoryDispatchContext.Provider value={dispatchChatHistory}>
        <ContainerWrapper>
          <ContactsContainer>
            <Header hType={'userHeader'} _name={user['name']['first']}/>
            <SearchAdd setSearch={setSearch}/>
            {contacts?<Contacts search={search} selectedUserState={selectedUserState} dispatchSelectedUser={dispatchSelectedUser} contacts={contacts}/>:''}
          </ContactsContainer>
          <HeaderWrapper>
            {
              selectedUserState.selectedUser?
              <>
                <Header setCallInfo={setCallInfo} hType={'friendHeader'} _name={selectedUserState.selectedUser}/>
                <ChatBox selectedUserState={selectedUserState}/>
                <InputBox ws={ws} user={user} dispatchSelectedUser={dispatchSelectedUser} selectedUserState={selectedUserState} value={selectedUserState.messages[selectedUser]}/>
              </>
              :
              <div id="dog-image">
                <img src={dog} alt="Hi!!" />
              </div>
            }
          </HeaderWrapper>

          {(callInfo.onCall)?
            <div onClick={vidClickHandler} ref={vidRef} className="video-box-m">
              <CallContainer/>
            </div>
            :''
          }
        </ContainerWrapper>
      </chatHistoryDispatchContext.Provider>
    </chatHistoryContext.Provider>
  )
}

export default Chat;