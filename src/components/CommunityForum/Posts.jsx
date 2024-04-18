import PostCard from './PostCard.jsx';
import '/src/styles/posts.css';
function Posts() {
  return(
    <div id="post-container">
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
    </div>
    
  )
}

export default Posts;