import { useContext } from 'react';
import { PostFilterContext,ChangeFilterContext } from '/src/components/Context/ForumContext.js';
import "/src/styles/forumheader.css"
const ForumHeader = ()=>{
  const filterPost = useContext(PostFilterContext);
  const changeFilter = useContext(ChangeFilterContext);
  const filterHandler = (e)=>{
    const data = e.target.attributes.data.value;
    changeFilter(data);
    return;
  }
  const dropDownHandler = ()=>{
    const cnt = document.getElementById("dropdown-content");
    switch(cnt.style.display){
      case 'none':{
        cnt.style.display = 'block';
        break;
      }
      default :{
        cnt.style.display = 'none';
      }
    }
  }
  return(
    <div id='forum-header'>
      <div id="forum-header-left">
        <div className="forum-header-dropdown">
          <button onClick={dropDownHandler} className="dropbtn">{filterPost}</button>
          <div id="dropdown-content">
            <div onClick={filterHandler} data={"hot"}>Hot</div>
            <div onClick={filterHandler} data={"best"}>Best</div>
            <div onClick={filterHandler} data={"new"}>New</div>
            <div onClick={filterHandler} data={"controversial"}>Controversial</div>
            <div onClick={filterHandler} data={"trending"}>Rising</div>
          </div>
        </div>
        <div id='post-type'>
          <button>Public</button>
        </div>
      </div>
      <div id="forum-header-right">
        <img src={'/src/assets/create-icon.png'} alt="" />
        <span>Create</span>
      </div>
    </div>
  )
}

export default ForumHeader;