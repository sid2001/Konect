import Loader from "./Loader";
import Chat from "./Chat/Chat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const TestComponent = ({status,user})=>{
  // const navigate = useNavigate();
  // useEffect(()=>{
  //   if(status==='1'&&user.isLoggedIn===false){
  //     console.log("checking user");
  //     navigate('/form?type=login');
  //   }
  // },[user,navigate])
  // const flag = status==='0';
  return(
    status==='0'?<Loader/>:<Chat user={user}/>
  )
}

export default TestComponent;