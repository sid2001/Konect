import ContainerWrapper from "./ContainerWrapper";
import Header from "./Header";
import HeaderWrapper from "./HeaderWrapper";
import ContactsContainer from "./ContactsContainer";
import Contacts from "./Contacts";
import ChatBox from "./ChatBox";
import InputBox from "./InputBox";
import { useRef,useContext, useState, useEffect } from "react";
import Theme from "../UI/Theme";
import CallContainer from "./CallContainer";
import SearchAdd from "./SearchAdd";
import Loader from "../Loader";
import { getContacts } from "../../api/user";
import { useNavigate } from "react-router-dom";
import '/src/styles/chat.css'

const Chat = ({user,status})=>{
  const [search,setSearch] = useState(false);
  const [contacts,setContacts] = useState('');
  const [clickCount,setClickCount] = useState(0);
  const vidRef = useRef(null);
  const navigate = useNavigate();

  useEffect(()=>{
    console.log('user effect: ',user);
    console.log('status: ',status)
    if((user.isLoggedIn===false||!user)&&status==='1') navigate('/form?type=login');
    // if(user.isLoggedIn===true)
    getContacts()
    .then(data=>{
      console.log('recv data: ',data.data);
      setContacts(data.data);
    })
    .catch(console.error)
  },[user,navigate,status]);

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
  if(status==='1')
  return(
    <ContainerWrapper>
      <ContactsContainer>
        <Header hType={'userHeader'} _name={'Siddharth'}/>
        <SearchAdd setSearch={setSearch}/>
        <Contacts search={search} contacts={contacts}/>
      </ContactsContainer>
      <HeaderWrapper>
      <Header setCallInfo={setCallInfo} hType={'friendHeader'} _name={'Sisa'}/>
      <ChatBox />
      <InputBox/>
      </HeaderWrapper>

      {(callInfo.onCall)?
          <div onClick={vidClickHandler} ref={vidRef} className="video-box-m">
            <CallContainer/>
          </div>
      :''}
    </ContainerWrapper>
  )
  else return <Loader/>
}

export default Chat;