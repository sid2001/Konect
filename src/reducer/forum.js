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
    default: {
      console.log("Invalid post action")
    }
  }
}

export {postReducer};