import { postReducer } from '/src/reducer/forum.js';
import { PostContext, PostDispatchContext,PostFilterContext,ChangeFilterContext,PostPremiseContext,ChangePostPremiseContext } from '/src/components/Context/ForumContext.js';
import { useReducer,useContext, useState } from 'react';
import {ReactNotifications} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import ForumHeader from './ForumHeader.jsx';
import Posts from './Posts.jsx';
import '/src/styles/forum.css'

const Forum = ()=>{
  const [postInfo,dispatchPosts] = useReducer(postReducer,{posts:[],loading:true,error:false,fetched:false});
  const [filter,setFilter] = useState(useContext(PostFilterContext));
  const [postPremise,setPostPremise] = useState(useContext(PostPremiseContext));

  return(
    //create a forum for displaying posts
    <PostContext.Provider value ={postInfo}>
      <PostDispatchContext.Provider value={dispatchPosts}>
        <PostFilterContext.Provider value={filter}>
          <ChangeFilterContext.Provider value={setFilter}>
            <PostPremiseContext.Provider value={postPremise}>
              <ChangePostPremiseContext.Provider value={setPostPremise}>
              <ReactNotifications/>
                <div id='forum-container'>
                  <div id='forum-wrapper'>
                    <ForumHeader/>
                    <Posts/>  
                  </div>
                </div>
              </ChangePostPremiseContext.Provider>
            </PostPremiseContext.Provider>
          </ChangeFilterContext.Provider>
        </PostFilterContext.Provider>
      </PostDispatchContext.Provider>
    </PostContext.Provider>
  )
}
export default Forum;