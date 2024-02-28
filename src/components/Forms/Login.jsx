import { useState } from "react";
import {login} from "../../utils/getUser";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    uname:'',
    password:'',
  });
  
  const inputChangeHandler = (e)=>{
    console.log(e);
    if(e.type==='change'){
      setFormData((f)=>({...f, [e.target.id]:e.target.value }));
    }

  }
  const formSubmitHandler = (f)=>{
    f.preventDefault();
    login(formData)
    .then(res=>{
      if(res.status===202){
        console.log('logged In successfully!!');
        console.log(res);
        user.setUser(JSON.parse(res.data));
        navigate("/chat");
      }
    })
    .catch(err=>{
      console.log('Logging failed: ',err);
    })
  }
  return(
    <form onSubmit={formSubmitHandler}>
    <div className="login-container">
        <div className="input-container">
          <label htmlFor="uname">Username</label>
          <input onChange={inputChangeHandler} value={formData.uname} required type="text" name="uname" id="uname" placeholder="jdoe123"/>
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input onChange={inputChangeHandler} value={formData.password} required type="password" name="password" id="password"/>
        </div>
    </div>
      <button className="submit" type="submit">Submit</button>
    </form>
  )
}

export default Login;