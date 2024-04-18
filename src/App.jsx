import {BrowserRouter,Routes,Route,Link,Navigate} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Home from './components/CommunityForum/Home';
import Forms from './components/Forms/Forms';
import TestComponent from './components/TestComponent';
import getUser from './utils/getUser';
import { UserContext } from './components/Context/userContext.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css'
import { useState,useEffect } from 'react';


const App = () => {
  const [user,setUser] = useState('');
  const [status,setStatus] = useState('0');
  console.log('status from app: ',status);
  console.log('user from app: ',user);

    useEffect(()=>{ 
      if(status==='0')
      getUser()
      .then(res=>{
      console.log('user info recvd: ',res);
      // console.log('status kjkj',status);
      setUser(res);
      setStatus('1');
    })
    .catch(err=>{
      console.log('cant connect to servers!!');
      console.log(err);
    }
    )
    },[status,user])
    console.log('credentials',import.meta.env.VITE_GOOGLE_AUTH_CLIENT_KEY);
    
  // },[])
  return(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_KEY}>
      <UserContext.Provider value={{setUser:setUser,user:user}}>
        <BrowserRouter basename='/'> 
          <Routes >
            <Route path ='/' element={<Home/>} />
            <Route path ="/form" 
              element={<Forms setStatus={setStatus} setUser={setUser}/>} 
            />
            <Route 
              path = '/chat' 
              element = {<TestComponent user={user} status={status}/>}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  )
  
}   

export default App;
