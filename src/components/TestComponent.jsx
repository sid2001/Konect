import Loader from "./Loader";
import Chat from "./Chat/Chat";
const TestComponent = ({status,user})=>{

  // const flag = status==='0';
  return(
    status==='0'?<Loader/>:<Chat user={user}/>
  )
}

export default TestComponent;