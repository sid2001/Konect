import ContainerWrapper from "./ContainerWrapper";
import Header from "./Header";
import HeaderWrapper from "./HeaderWrapper";
import ContactsContainer from "./ContactsContainer";
import Contacts from "./Contacts";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";
import CallContainer from "./CallContainer";
import IncomingCall from "../CallNotification/IncomingCall";
import Loader from "../Loader";
import SearchAdd from "./SearchAdd";
import { chatHistoryContext,chatHistoryDispatchContext,incomingCallContext,dispatchIncomingCallContext } from "../Context/ChatContext";
import { useContext, useState, useEffect, useReducer } from "react";
import { getContacts } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "/src/api/test.js";
import { incomingCallReducer,initialNotificationState } from "../../reducer/notification";
import { chatUserStateReducer,initialState } from "../../reducer/chatReducer";
import { chatHistoryReducer, initialChatHistory} from "../../reducer/chatReducer";
import connectChat from '/src/services/WebSocketServer.js'
import Navbar from "../NavBar/Navbar";
import dog from '/src/assets/dog.svg';
import '/src/styles/chat.css';
import '/src/styles/vc.css';

const Chat = ({user})=>{
  const [selectedUserState,dispatchSelectedUser] = useReducer(chatUserStateReducer,initialState);
  const [chatHistory,dispatchChatHistory] = useReducer(chatHistoryReducer,initialChatHistory);
  const [incomingCall, dispatchIncomingCall] = useReducer(incomingCallReducer,initialNotificationState);
  const [search,setSearch] = useState(false);
  const [contacts,setContacts] = useState('');
  const [ws,setWs] = useState(null);
  const [wsStatus,setWsStatus] = useState(-1);
  const [callStatus,setCallStatus] = useState(null);
  const selectedUser = selectedUserState.username;
  const navigate = useNavigate();
  console.log('user from chat: ',user);
  const [callInfo,setCallInfo] = useState(
    {
      onCall:false,
      status:'',
      to:'',
    }
  )
  useEffect(()=>{
    if(user.isLoggedIn===true){
      console.log('')
      setWs((w)=>{
        if(w!==null){
          console.log('closing ws');
          w.close();
        }
        console.log('openeing ws');
        return connectChat(user.username,dispatchChatHistory,dispatchIncomingCall,setCallStatus,setWsStatus);
      });
      return ()=>{
        const wss = ws;
        if(wss!==null)wss.close();
      }
    }
  },[user]);
  
  // useEffect(()=>{
  //   if(wsStatus===0&&user.isLoggedIn===true){
  //     setWs((w)=>{
  //       if(w!==null){
  //         console.log('closing ws');
  //         // w.close();
  //       }
  //       console.log('openeing ws');
  //       return connectChat(user.username,dispatchChatHistory,dispatchIncomingCall,setCallStatus,setWsStatus);
  //     });
  //     return ()=>{
  //       const wss = ws;
  //       if(wss!==null)wss.close();
  //     }
  //   }
  // },[])

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
  },[user])
  // useEffect(()=>{
  //   if(incomingCall)
  // },[incomingCall])
  console.log(selectedUserState)
  return(
    <incomingCallContext.Provider value={incomingCall}>
      <dispatchIncomingCallContext.Provider value={dispatchIncomingCall}>
        <chatHistoryContext.Provider value={chatHistory}>
          <chatHistoryDispatchContext.Provider value={dispatchChatHistory}>
            {incomingCall.ringing?<IncomingCall setCallInfo={setCallInfo} setCallStatus={setCallStatus} ws={ws} />:''}
            <Navbar/>
            <ContainerWrapper>
              <ContactsContainer>
                <Header hType={'userHeader'} _name={user.name?.firstName}/>
                <SearchAdd setSearch={setSearch}/>
                {contacts?<Contacts search={search} selectedUserState={selectedUserState} dispatchSelectedUser={dispatchSelectedUser} contacts={contacts}/>:''}
              </ContactsContainer>
              <HeaderWrapper>
                {
                  selectedUserState.selectedUser?
                  <>
                    <Header user={user} setCallStatus={setCallStatus} setCallInfo={setCallInfo} hType={'friendHeader'} _name={user.username} ws={ws} selectedUserState = {selectedUserState}/>
                    <ChatBox selectedUserState={selectedUserState}/>
                    <InputBox ws={ws} user={user} dispatchSelectedUser={dispatchSelectedUser} selectedUserState={selectedUserState} value={selectedUserState.messages[selectedUser]}/>
                  </>
                  :
                  <div id="dog-image">
                    {/* <img src={dog} alt="Hi!!" /> */}
                  </div>
                }
              </HeaderWrapper>
              {callInfo.onCall?
              <CallContainer ws={ws} callStatus={callStatus} setCallStatus={setCallStatus} username = {user.username} callInfo={callInfo} setCallInfo={setCallInfo}/>
              :''}
            </ContainerWrapper>
          </chatHistoryDispatchContext.Provider>
        </chatHistoryContext.Provider>
      </dispatchIncomingCallContext.Provider>
    </incomingCallContext.Provider>
  )
}

export default Chat;