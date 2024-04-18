import { postReducer } from '/src/reducer/forum.js';
import { PostContext, PostDispatchContext,PostFilterContext,ChangeFilterContext } from '/src/components/Context/ForumContext.js';
import { useReducer,useContext, useState } from 'react';
import ForumHeader from './ForumHeader.jsx';
import '/src/styles/forum.css'

const Forum = ()=>{
  const [posts,dispatchPosts] = useReducer(postReducer,[]);
  const filterPost = useContext(PostFilterContext);
  const [filter,setFilter] = useState(filterPost);

  return(
    //create a forum for displaying posts
    <PostContext.Provider value ={posts}>
      <PostDispatchContext.Provider value={dispatchPosts}>
        <PostFilterContext.Provider value={filter}>
          <ChangeFilterContext.Provider value={setFilter}>
            <div id='forum-container'>
              <ForumHeader/>
            </div>
          </ChangeFilterContext.Provider>
        </PostFilterContext.Provider>
      </PostDispatchContext.Provider>
    </PostContext.Provider>
  )
}
export default Forum;