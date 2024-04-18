import threeDots from "/src/assets/three-dots.png";
import likeIcon from "/src/assets/like-icon.png"
import commentIcon from "/src/assets/comment-icon.png";
import shareIcon from "/src/assets/share-icon.png";
import "/src/styles/postcard.css";
function PostCard(){

  return(
    <div id="postcard-container">
      <div className="post-header-wrapper">
        <div className="post-header-left">
          <div className="post-pfp">
            <img src="/src/assets/default-profile.png" alt="" />
          </div>
          <div className="post-username">
            {"User1"}
          </div>
        </div>
        <div className="post-header-right">
          <img src={threeDots} alt="" />
        </div>
      </div>
      <div className="post-body-wrapper">
        <div className="post-title">
          {"Jio Airtel Vodafone"}
        </div>
        <div className="post-content">
          {"lorem ipsum lorem ipslorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumum lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"}
        </div>
        <div className="post-photo">
          {/* <div className="post-photo-foreground"> */}
            <img src={"/src/assets/dog.svg"} alt="" />
          {/* </div> */}
          {/* <img className="post-photo-background" src={"/src/assets/dog.svg"} alt="" /> */}
        </div>
      </div>
      <div className="post-footer-wrapper">
        <div className="post-icons" id="post-likes">
            <img src={likeIcon} alt="" />
            {"10"}
        </div>
        <div className="post-icons" id="post-comments" >
          <img src={commentIcon} alt="" />
          {"12"}
        </div>
        <div className="post-icons" id="post-share">
          <img src={shareIcon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default PostCard;