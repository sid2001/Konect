import { useContext, useState } from 'react';
import { PostFilterContext,ChangeFilterContext,PostPremiseContext,ChangePostPremiseContext } from '/src/components/Context/ForumContext.js';
import CreatePost from './CreatePost.jsx';
import {Store as store} from 'react-notifications-component'
import "/src/styles/forumheader.css"
import { UserContext } from '../Context/userContext.js';
const ForumHeader = ()=>{
  const filterPost = useContext(PostFilterContext);
  const changeFilter = useContext(ChangeFilterContext);
  const postPremise = useContext(PostPremiseContext);
  const changePostPormise = useContext(ChangePostPremiseContext);
  const {user} = useContext(UserContext);
  const [createPost,setCreatePost] = useState(false);
  const filterHandler = (e)=>{
    const data = e.target.attributes.data.value;
    const cnt = document.getElementById("dropdown-content");
    cnt.style.display = 'none';
    changeFilter(data);
    return;
  }
  const dropDownHandler = ()=>{
    const cnt = document.getElementById("dropdown-content");
    switch(cnt.style.display){
      case 'none':{
        cnt.style.display = 'block';
        break;
      }
      default :{
        cnt.style.display = 'none';
      }
    }
  }

  const createPostHandler = ()=>{
    switch(user?.isLoggedIn){
      case true:{
        console.log('createPost');
        setCreatePost(true);
        break;
      }
      default:{
        store.addNotification({
        title: 'Guest user',
        message: 'Login to start posting',
        type: 'warning',
        insert: 'top',
        container: 'top-left',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
        });
      }
    }
  }
  const premiseHandler = ()=>{
    switch(postPremise){
      case 'public':
        changePostPormise('personal');
        break;
      case 'personal':{
        changePostPormise('public');
        break;
      }
      default:{
        console.log('invalid premise!!');
      }
    }
  }
  return(
    <div id='forum-header'>
      <div id="forum-header-left">
        <div className="forum-header-dropdown">
          <button onClick={dropDownHandler} className="dropbtn">{filterPost[0].toUpperCase()+filterPost.slice(1)}</button>
          <div style={{display:'none'}} id="dropdown-content">
            <div style={{backgroundColor:'rgb(45, 45, 45)',fontWeight:'400'}}>Sort By</div>
            <div className="filter-options" onClick={filterHandler} data={"hot"}>Hot</div>
            <div className="filter-options" onClick={filterHandler} data={"best"}>Best</div>
            <div className="filter-options" onClick={filterHandler} data={"new"}>New</div>
            <div className="filter-options" onClick={filterHandler} data={"controversial"}>Controversial</div>
            <div className="filter-options" onClick={filterHandler} data={"trending"}>Trending</div>
          </div>
        </div>
        <div id='post-type'>
          <button onClick={premiseHandler}>{postPremise[0].toUpperCase()+postPremise.slice(1)}</button>
        </div>
      </div>
      <div id="forum-header-right">
        <img onClick={createPostHandler} src={'/src/assets/create-icon.png'} alt="" />
        <span>Create</span>
      </div>
      {createPost?<CreatePost setCreatePost={setCreatePost}/>:''}
    </div>
  )
}

export default ForumHeader;