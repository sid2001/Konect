import {BrowserRouter,Routes,Route,Link,Navigate} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Home from './components/Chat/Home';
import Forms from './components/Forms/Forms';
import getUser from './utils/getUser';
import { UserContext } from './components/Context/userContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css'
import { useState,useEffect } from 'react';

const App = () => {
  const [user,setUser] = useState('');
  const [status,setStatus] = useState(0);
  console.log('user: ',user);
  // const navigate = useNavigate();
  // useEffect(()=>{
    console.log('user hook',user);
    useEffect(()=>{
      console.log('user updated',user);
      if(user) setStatus(1);
    },[user]);

    useEffect(()=>{  
      setStatus(0); 
      getUser()
      .then(res=>{
      console.log('user info recvd: ',res);
      setUser(res);
    })
    .catch(err=>{
      console.log('cant connect to servers!!');
      console.log(err);
    }
    )
    },[])
    console.log('credentials',import.meta.env.VITE_GOOGLE_AUTH_CLIENT_KEY);
    
  // },[])
  return(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_KEY}>
      <UserContext.Provider value={{setUser:setUser,user:user}}>
        <BrowserRouter basename='/'> 
          <Routes >
            <Route path ='/' element={<Home/>} />
            <Route path ="/form" 
              element={<Forms/>} 
            />
            <Route 
              path = '/chat' 
              element = {<Chat user={user}/>}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  )
  
}   

export default App;
