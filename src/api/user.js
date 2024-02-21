import axios from 'axios';

axios.defaults.baseURL = 'https://127.0.0.1:8081';

export const getContacts  = ()=>{
  const config = {
    method:'get',
    url:'/user/getContacts',
    withCredentials:true
  }

  return axios(config)
  .then(res=>{
    console.log(res);
    if(res.status===200)
      return JSON.parse(res.data);
    else return new Error('failed fetching contacts!')
  })
}