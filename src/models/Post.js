const Post = class{
  constructor({postId,userId,userData, title, description,attachment, metaData}){
    this.postId = postId;
    this.userId = userId;
    this.userData = userData;
    this.data = {
      title: title,
      description: description,
      attachment: attachment
    };
    this.metaData = metaData;
    this.comments = [];
  }

  // Method to add a comment to the post
  addComment(commentId) {
    this.comments.push(commentId);
    this.metaData.commentCount++;
  }

  // Method to increment the like count of the post
  incrementLikeCount() {
    this.metaData.likeCount++;
  }

  // Method to get the total number of comments on the post
  getCommentCount() {
    return this.metaData.commentCount;
  }
  
  getAllData() {
    return {
      postId: this.postId,
      userId: this.userId,
      userData: this.userData,
      data: this.data,
      metaData: this.metaData,
      comments: this.comments
    }
  }
}

export default Post;