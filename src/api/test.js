import axios from 'axios';

axios.defaults.baseURL = 'https://127.0.0.1:8081';

export const getAllUsers = ()=>{
  const config = {
    method:'get',
    url:'/test/getAllUsers',
    withCredentials:true
  }

  return axios(config)
  .then(res=>{
    console.log(res);
    if(res.status===200)
      return res.data;
    else return new Error('failed fetching contacts!')
  })
}