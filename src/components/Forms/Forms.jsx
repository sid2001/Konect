import { useEffect, useRef, useState } from "react";
import '/src/styles/forms.css';
import Register from "./Register";
import Login from "./login";
import { useLocation, useParams } from "react-router-dom";

const Forms = ()=>{
  const {search} = useLocation();
  const param  = new URLSearchParams(search);
  console.log('para: ',param)
  const m = param.get('type')==='login'?1:0;
  const [mode,setMode] = useState(m);
  const modes = ['Register','Sign-in'];
  const myRef = useRef(null);
  const changeMode = ()=>{
    setMode(m=>((m+1)%2));
  }

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
    </div>
  )
}

export default Forms;