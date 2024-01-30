import axios from "axios";

axios.defaults.baseURL = 'https://127.0.0.1:8081/';

const getUser = async ()=>{

  const config = {
    method:'get',
    url:'/getUser',
    withCredentials:true
  }
  return axios(config)
  .then(res=>{
    console.log(res); 
    return res.data;
  })
}
export const login = async (data)=>{
  const body = {
    username:data.uname,
    passwordHash:data.password
  }
  const config = {
    method:'post',
    url:'/login',
    data:body,
    withCredentials:true,
    headers:{"Content-Type":"application/json"}
  }
  return axios(config)
  .then(res=>{
    console.log('inside getUser: ',res);
    return res;
  })
}
export const register = async (data)=>{
  const body = {
    name:{first:data.fname,last:data.lname},
    username:data.uname,
    email:data.email,
    passwordHash:data.password,
  }
  const config = {
    method:'post',
    url:'/register',
    data:body,
    withCredentials:true,
    headers:{"Content-Type":'application/json','Access-Control-Allow-Origin':'https://127.0.0.1:5173/'}
  }
  return axios(config)
  .then(res=>{
    console.log(res);
    return res;
  })
}
export default getUser;