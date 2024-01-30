import {BrowserRouter,Routes,Route,Link,Navigate} from 'react-router-dom';
import Chat from './components/Chat';
import Home from './components/Home';
import Forms from './components/Forms/Forms';
import getUser from './utils/getUser';
import { UserContext } from './components/Context/userContext';

import './App.css'
import { useState,useEffect } from 'react';

const App = () => {
  const [user,setUser] = useState('');
  console.log('user: ',user);
  // const navigate = useNavigate();
  if(!user)  
  getUser()
  .then(res=>{
    console.log('user info recvd: ',res);
    setUser(res.data);
    })
  .catch(err=>{
    console.log('cant connect to servers!!');
    console.log(err);
  }
  )
  
  return(
    <UserContext.Provider value={{setUser:setUser,user:user}}>
    <BrowserRouter basename='/'> 
      <Routes >
        <Route path ='/' element={<Home/>} />
        <Route path ="/form" 
        element={<Forms/>} />
        <Route 
        path = '/chat' 
        element = {user?<Chat />:<Navigate to='/form'/>}
        />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}   

export default App
