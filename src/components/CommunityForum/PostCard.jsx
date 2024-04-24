import threeDots from "/src/assets/three-dots.png";
import likeIcon from "/src/assets/like-icon.png"
import commentIcon from "/src/assets/comment-icon.png";
import shareIcon from "/src/assets/share-icon.png";
import PropTypes from 'prop-types';
import "/src/styles/postcard.css";
import { useState } from "react";
function PostCard({postObject}) {
  const [liked,setLiked] = useState(false);
  const [viewPostPhoto,setViewPostPhoto] = useState(false);
  const viewPostPhotoHandler = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    setViewPostPhoto((s)=>{
      return !s
    });
    // e.target.className = "view-post-photo";
    console.log('Clicked photo');
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
          {/* <div className="post-photo-foreground"> */}
           {postObject.data.attachment.images.length>0?<img id='post-foreground-photo'src={postObject.data.attachment.images[0]} alt="" />:''}
          {/* </div> */}
          {/* <img className="post-photo-background" src={"/src/assets/dog.svg"} alt="" /> */}
        </div>
      </div>
      <div className="post-footer-wrapper">
        <div className="post-icons" id="post-likes">
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