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
  const onDownloadProgress = (progressEvent)=>{
    const xhr = progressEvent.event.target
     const { responseText } = xhr
     console.log("=====responseText======")
     console.log(responseText)
     console.log("=====responseText======")
  }
  const config = {
    method: 'post',
    url: '/forum/createPost',
    data: postData,
    withCredentials: true,
    responseType: 'stream',
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Auth-Type': 'session',
    },
    onUploadProgress,
    onDownloadProgress
  }
  // const sse = new EventSource('http://localhost:8081/forum/createPost',{
  //   withCredentials: true,
  // });
  // console.log(sse);
  // sse.onmessage = (event) => {
  //   console.log(event);
  // }
  return axios(config)
  .then(res=>{
    console.debug('response from createPost: ', res);
    console.log('response text sse');
    return {status:res.status,data:res.data,res}
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