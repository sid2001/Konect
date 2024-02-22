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
import { getAllUsers } from "/src/api/test.js";
import '/src/styles/chat.css'

const Chat = ({user})=>{
  const [search,setSearch] = useState(false);
  const [contacts,setContacts] = useState('');
  const [clickCount,setClickCount] = useState(0);
  const vidRef = useRef(null);
  const navigate = useNavigate();
  // console.log('user effect: ',user);
    useEffect(()=>{
      if(user.isLoggedIn===false) navigate('/form?type=login');
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
    <ContainerWrapper>
      <ContactsContainer>
        <Header hType={'userHeader'} _name={'Siddharth'}/>
        <SearchAdd setSearch={setSearch}/>
        {contacts?<Contacts search={search} contacts={contacts}/>:''}
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
}

export default Chat;