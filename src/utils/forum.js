import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_DEFAULT_BASE_URL;

const createPost = async (postData) => {

  const onUploadProgress = (progressEvent)=>{
    const {loaded,total} = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    if (percent <= 100) {
      console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
    }
  }
  const config = {
    method: 'post',
    url: '/forum/createPost',
    data: postData,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Auth-Type': 'session',
    },
    onUploadProgress
  }
  return axios(config)
  .then(res=>{
    console.debug('response from createPost: ', res);
    return {status:res.status,data:res.data}
  })
}

const getAllPosts = async () => {
  const config = {
    method: 'get',
    url: '/forum/getAllPosts',
    withCredentials: true,
  }
  return axios(config)
  .then(res=>{
    console.debug('response from getAllPosts: ', res);
    return {status:res.status,data:res.data.data};
  })
}

export { createPost,getAllPosts };