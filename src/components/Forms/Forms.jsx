import { useEffect, useRef, useState } from "react";
import '/src/styles/forms.css';
import Register from "./Register";
import Login from "./login";
import { useLocation, useParams,useNavigate } from "react-router-dom";
import { googleLogout,useGoogleLogin } from "@react-oauth/google";
import googleIcon from "/src/assets/google-icon.svg";
import { getUserInfo,authToken } from "../../utils/googleAuth";

const Forms = ({setStatus,setUser})=>{
  const [authCode,setAuthCode] = useState('');
  const [verifiedToken,setVerifiedToken] = useState(false);
  const {search} = useLocation();
  const navigate = useNavigate();
  const param  = new URLSearchParams(search);
  // console.log('para: ',param)
  const m = param.get('type')==='login'?1:0;
  const [mode,setMode] = useState(m);
  const modes = ['Register','Sign-in'];
  const myRef = useRef(null);
  const changeMode = ()=>{
    setMode(m=>((m+1)%2));
  }
  useEffect(()=>{
    if(authCode){
      setStatus(0);
    authToken(authCode.code)
    .then(res=>{
      const data = JSON.parse(res.data)
      console.log('server res for auth code: ',data);
      if(res.status===202)
      { 
        setUser(()=>{
          setStatus(1);
          return data
        })
        navigate('/chat');
      }
      else{
        console.log('error logging in: ',res);
      }
    })
    .catch(err=>{
      console.error("error while sending auth code",err)
    })
  }
  },[authCode,navigate]);

  //send backend the code to obatin tokens instead
  // useEffect(()=>{
  //   if(userCredentials){
  //     getUserInfo(userCredentials)
  //     .then(res=>{
  //       console.log('userinfo: ',res);
  //     })
  //     .catch(err=>{
  //       console.log('error getting user info: ',err);
  //     })
  //   }
  // },[userCredentials]);
  const loginSuccessHandler = (res)=>{
    setAuthCode(res);
    // console.log("uesr id tokey try: ",res.getAuthResponse().id_token);
    console.log('user credentials: ',res);
  }
  const errorHandler = (err)=>{
    console.log('error getting google login: ',err);
  }

  const login = useGoogleLogin({
    onSuccess:loginSuccessHandler,
    onError:errorHandler,
    flow:'auth-code'
  })

  return(
    <div ref={myRef} id="form-container">
      <img className="design curve1"></img>
      {mode===0?<img className="design curve2"></img>:''}
      <img className="design curve3"></img>
      <div className="header">
        <h1  className="heading">{modes[mode]}</h1>
      <div className="options">
      <div onClick={changeMode} className={`${modes[(mode+1)%2].toLowerCase()}`}>{`${modes[(mode+1)%2].toLowerCase()}`}</div>
      </div>  
      </div>
      {mode===0?<Register setMode={setMode}/>:<Login/>}
      <div className="google-button-wrapper">
        <img className="google-icon" src={googleIcon} alt="" />
        <button onClick={login} className="google-login-btn">Sign in with Google🚀</button>
      </div>
      
    </div>
  )
}

export default Forms;