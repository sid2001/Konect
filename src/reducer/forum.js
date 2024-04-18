
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
    default: {
      console.log("Invalid post action")
    }
  }
}

export {postReducer};