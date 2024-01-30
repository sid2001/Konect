import { useState ,useRef, useEffect} from "react";
import { register } from "../../utils/getUser";
import { useNavigate } from "react-router-dom";

const Register = ({setMode})=>{
  const [formValid,setFormValid] = useState({
    fname:'',
    lname:true,
    email:'',
    uname:'',
    password:'',
    repassword:''
  });
  const [formData,setFormData] = useState({
    fname:'',
    lname:'',
    uname:'',
    email:'',
    password:'',
    repassword:''
  });
  const [target,setTarget] = useState('');
  const navigate = useNavigate();
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var validPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  
  useEffect(()=>{
    isValid(target);
  },[target,formData])

  const isValid = (_id)=>{
    // console.log(formData[_id]);
    if(formData[_id]===''){
      // console.log('isi',formData[_id])
      setFormValid((f)=>({...f,[_id]:false}))
      return
    }
    else{
      // console.log(formValid[_id]);
      if(!formValid[_id])
        setFormValid((f)=>({...f,[_id]:true}));
    }
    switch(_id){
      case "email":{
        if(!formData[_id].match(validRegex))
          setFormValid((f)=>({...f,[_id]:false}));
        else
          if(!formValid[_id])
            setFormValid((f)=>({...f,[_id]:true}));
          break;
      }
      case "repassword":{
        if(formData[_id]!==formData['password'])
          setFormValid((f)=>({...f,[_id]:false}));
        else
          if(!setFormValid[_id])
          setFormValid((f)=>({...f,[_id]:true}));
        break;
      }
      case "password":{
        if(!((formData[_id]).match(validPass))){
          setFormValid((f)=>({...f,[_id]:false}));
        }
        else
          if(!setFormValid[_id])
          setFormValid((f)=>({...f,[_id]:true}));
        if(formData[_id]!==formData['repassword'])
          setFormValid((f)=>({...f, repassword:false}));
        else
          if(!setFormValid[_id])
            setFormValid((f)=>({...f,repassword:true}));
        break;

      }
    }
  }

  const inputChangeHandler = (e)=>{
    // console.log(e);
    if(e.type==='change'){
      setFormData((f)=>{return ({...f, [e.target.id]:e.target.value })});
      setTarget(e.target.id)
    }

  }

  
  const formHandler = (e)=>{
    e.preventDefault();

    register(formData)
    .then(res=>{
      if(res.status===200)
        setMode(1);
        // navigate(`/form?${res.data.param}`);
    })
    .catch(e=>{
      console.error('error sending request',e);
    });
  }
  return(
    <form onSubmit={formHandler}>
    <div className="register-container">
        <div className="input-container">
          <label htmlFor="fname">First Name</label>
          <input className={formValid['fname']===false?'invalid':''} onChange={inputChangeHandler} value={formData.fname} required type="text" name="fname" id="fname" placeholder="john"/>
        </div>
        <div className="input-container">
          <label htmlFor="lname">Last Name</label>
          <input onChange={inputChangeHandler} value={formData.lname} type="text" name="lname" id="lname" placeholder="doe(optional)"/>
        </div>
        <div className="input-container">
          <label htmlFor="uname">Username</label>
          <input className={formValid['uname']===false?'invalid':''} onChange={inputChangeHandler} value={formData.uname} required type="text" name="uname" id="uname" placeholder="jdoe123"/>
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input className={formValid['email']===false?'invalid':''} onChange={inputChangeHandler} value={formData.email} required type="text" name="email" id="email" placeholder="john@gmail.com" />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input className={formValid['password']===false?'invalid':''} onChange={inputChangeHandler} value={formData.password} required type="password" name="password" id="password"/>
        </div>
        <div className='input-container'>
          <label htmlFor="repassword">Re-Password</label>
          <input className={formValid['repassword']===false?'invalid':''} onChange={inputChangeHandler} value={formData.repassword} required type="password" name="repassword" id="repassword" />
        </div>
    </div>
      <button  disabled = {!(formValid.fname&&formValid.uname&&formValid.email&&formValid.password&&formValid.repassword)} className='submit' type="submit">Submit</button>
    </form>
  )
}

export default Register;