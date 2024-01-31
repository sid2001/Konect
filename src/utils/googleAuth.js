import axios from 'axios';

export const getUserInfo = (user)=>{
  const config = {
    url:`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
    method:'get',
    headers:{
      Authorization:`Bearer ${user.access_token}`,
      Accept: 'application/json'
    }
  }

  return axios(config);
}

export const authToken = (authCode)=>{
  const config = {
    url:'https://127.0.0.1:8081/auth/token',
    method:'post',
    data:{
      authCode:authCode
    },
    headers:{
      'Content-Type':"application/json"
    },
    withCredentials:true
  }
  return axios(config);
}