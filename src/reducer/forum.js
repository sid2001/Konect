const postReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_posts': {

      return;
    }
    case 'create_post': {
      return;
    }
    case 'reload': {
      return;
    }
    case 'fetch_all_posts_success': {
      console.log('post action: ',action);
      return(
        {...state,posts:action.data,loading:false,fetched:true}
      )
    }
    case 'fetch_all_posts_pending':{
      return(
        {...state,loading:true,fetched:false}
      )
    }
    case 'fetch_all_posts_failed':{
      return(
        {...state,error:true,loading:false,fetched:true}
      )
    }
    case 'like_post':{
      const post = state.posts;
      if(action.data==='1'){
        for(let i=0;i<post.length;i++){
          if(post[i].postId===action.postId){
            post[i].metaData.likeCount=post[i].metaData.likeCount+1;
          }
        }
      }else if(action.data==='0'){
        for(let i=0;i<post.length;i++){
          if(post[i].postId===action.postId){
            post[i].metaData.likeCount=post[i].metaData.likeCount-1;
          }
        }
      }
      return(
        {...state,posts:post}
      )
    }
    default: {
      console.log("Invalid post action")
    }
  }
}

export {postReducer};