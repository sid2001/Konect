import axios from "axios";
// import https from 'https';
// axios.defaults.baseURL = 'https://127.0.0.1:8081/';
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_DEFAULT_BASE_URL;

const getUser = async ()=>{

  const config = {
    method:'get',
    url:'/getUser',
    withCredentials:true,
    headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","X-Auth-Type":"session","Authorization":"jwttoken"}
  }
  return axios(config)
  .then(res=>{
    console.log(res); 
    return JSON.parse(res.data);
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
    headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
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

const logOut = async ()=>{
  const config = {
    method:'post',
    url:'/logout',
    withCredentials:true,

    headers:{"Content-Type":'application/json','Access-Control-Allow-Origin':'https://127.0.0.1:5173/',"X-Auth-Type":"session"}
  }
  return axios(config).then((res)=>{
    return {stat:res.status,data:res.data}
  })
}
export {logOut};
export default getUser;