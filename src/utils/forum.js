import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_DEFAULT_BASE_URL;

const createPost = async (postData) => {
  const config = {
    method: 'post',
    url: '/forum/createPost',
    data: postData,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Type': 'session',
    },
  }

  return axios(config)
  .then(res=>{
    console.debug('response from createPost: ', res);
    return {status:res.status,data:res.data}
  })
}


export { createPost };