const Comment = class {
  constructor(postId, comment, username, profilePicture,metaData,replies) {
    this.postId = postId;
    this.comment = comment;
    this.userData = {
      username: username,
      profilePicture: profilePicture
    };
    this.metaData = metaData;
    this.replies = [];
  }

  static create(commentData) {
    return new this(commentData.postId, commentData.comment, commentData.username, commentData.profilePicture);
  }

  addReply(reply) {
    this.replies.push(reply);
    this.metaData.replyCount++;
  }

  incrementLikeCount() {
    this.metaData.likeCount++;
  }

  getReplyCount() {
    return this.metaData.replyCount;
  }
  getAllData() {
    return {
      postId: this.postId,
      comment: this.comment,
      username: this.userData.username,
      profilePicture: this.userData.profilePicture,
      metaData: this.metaData,
      replies: this.replies
    }
  }
}

export default Comment;

