import PostCard from './PostCard.jsx';
import Post from '/src/models/Post.js';
import {getAllPosts} from '/src/utils/forum.js';
import '/src/styles/posts.css';
import { useContext, useEffect } from 'react';
import {PostContext,PostDispatchContext} from '/src/components/Context/ForumContext.js';
import logo from '/src/assets/logo4.png';
function Posts() {
  const postInfo = useContext(PostContext);
  // const {posts,loading,error,fetched} = postInfo;
  const dispatchPosts = useContext(PostDispatchContext);
  useEffect(()=>{
    console.log('postInfo: ',postInfo);
    const fetchData = async ()=> {
      try{
        const {status,data} = await getAllPosts();
        console.log('post data received: ',data);
        if(status!==200){
          throw new Error('Failed to fetch posts');
        }
        const postList = data.map(post => {
          console.log('post from post list mapping: ',post)
          return new Post(post)
        });
        dispatchPosts({type:'fetch_all_posts_success',data:postList})
      }catch(err){
        dispatchPosts({type:'fetch_all_posts_failed',data:null})
      }
    } 
    if(postInfo.fetched===false){
      fetchData();
      console.log('fetching');
      // dispatchPosts({type:'fetch_all_posts_pending',data:null})
    }
    console.log('postInfo inside use: ',postInfo);
  },[postInfo.fetched,dispatchPosts,postInfo,postInfo.posts])
  if(postInfo.loading){
    return(
      <div id='post-container'>
        {/* <div id='loader'> */}
          <img id='loader' src={logo} alt="" />
        {/* </div> */}
      </div>
    )
  }else if(postInfo.error){
    return(
      <div id='post-container'>
        {/* <div id='loader'> */}
          <img id='post-error' src={logo} alt="" />
        {/* </div> */}
      </div>
    )
  }else if(postInfo.fetched===true){
    console.log('posts inside fetched true: ',postInfo);
    return(
    <div id="post-container">
        {postInfo.posts?.map(post=>{
          console.log('mapping posts',post);
          return <PostCard key={post.postId} postObject={post}/>
        }).reverse()}
    </div>
  )
  }
  
}

export default Posts;