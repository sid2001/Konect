import threeDots from "/src/assets/three-dots.png";
import likeIcon from "/src/assets/like-icon.png"
import commentIcon from "/src/assets/comment-icon.png";
import shareIcon from "/src/assets/share-icon.png";
import PropTypes from 'prop-types';
import { UserContext } from "/src/components/Context/userContext.js";
import { likePost } from "/src/utils/forum.js";
import {PostDispatchContext} from "/src/components/Context/ForumContext.js";
import "/src/styles/postcard.css";
import {Store as store} from 'react-notifications-component'
import { useContext, useState } from "react";
function PostCard({postObject}) {
  const user = useContext(UserContext);
  const [liked,setLiked] = useState(false);
  const [viewPostPhoto,setViewPostPhoto] = useState(false);
  const dispatchPosts = useContext(PostDispatchContext);
  const viewPostPhotoHandler = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    setViewPostPhoto((s)=>{
      return !s
    });
    // e.target.className = "view-post-photo";
    console.log('Clicked photo');
  }

  const likeHandler = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    // console.log('user: ',user);
    if(user.user.isLoggedIn===false){
      store.addNotification({
        title: 'Guest user',
        message: 'Login to like posts',
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
      return;
    }else{
      // console.log('postObject: ',postObject.postId);
      const res = await likePost(postObject.postId);
      if(res.status===200){
        setLiked(()=>{
          if(res.data==='1') return true;
          else return false
        });
        dispatchPosts({type: 'like_post',data:res.data,postId:postObject.postId});
      }else{
        store.addNotification({
        title: 'Error',
        message: res.data,
        type: 'danger',
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
  return(
    <div id="postcard-container">
      <div className="post-header-wrapper">
        <div className="post-header-left">
          {viewPostPhoto!==false?
          <div onClick={viewPostPhotoHandler} id="view-post-photo">
            <img src={postObject.data.attachment.images[0]} alt="" />
          </div>:null}
          <div className="post-pfp">
            <img src="/src/assets/default-profile.png" alt="" />
          </div>
          <div className="post-username">
            {postObject.userData.username}
          </div>
        </div>
        <div className="post-header-right">
          <img src={threeDots} alt="" />
        </div>
      </div>
      <div className="post-body-wrapper">
        <div className="post-title">
          {postObject.data.title}
        </div>
        <div className="post-content">
          {postObject.data.description}
        </div>
        <div className="post-photo"  onClick={viewPostPhotoHandler} >
          <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${postObject.data.attachment.images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(90px)', // Adjust the blur radius as needed
            zIndex: 0, // Ensure the background is behind the image
          }}
        />
           {postObject.data.attachment.images.length>0?<img id='post-foreground-photo'src={postObject.data.attachment.images[0]} alt="" />:''}
        </div>
      </div>
      <div className="post-footer-wrapper">
        <div className="post-icons" id={`post-likes${liked?'-liked':''}`} onClick={likeHandler}>
            <img src={likeIcon} alt="" />
            {postObject.metaData.likeCount}
        </div>
        <div className="post-icons" id="post-comments" >
          <img src={commentIcon} alt="" />
          {postObject.metaData.commentCount}
        </div>
        <div className="post-icons" id="post-share">
          <img src={shareIcon} alt="" />
        </div>
      </div>
    </div>
  )
}

PostCard.propTypes ={
  postObject :PropTypes.object
}

export default PostCard;