import plus from '/src/assets/plus.svg';
import search from '/src/assets/search.svg';
import dropdown from '/src/assets/dropdown.png';
import cross from '/src/assets/cross.png';
import { useState } from 'react';
const SearchAdd = ({setSearch})=>{
  const [drop,setDrop] = useState(false);
  const dropHandler = ()=>{
    setDrop((s)=>
      s?false:true
    )
    setSearch((s)=>
      s?false:true
    )
  }
  return(
    <>
      {drop===true?<div className='search-add-wrapper'><img className='add-friend-button' src={plus} alt="add" />
      <input className='search-contact' type="text" />
      <img className='search-friend-button' src={search} alt="" />
      <div ><img className='cross' onClick={dropHandler}  src={cross} alt="" /></div></div>
      :<div className='drop-wrapper'>< img src={dropdown} onClick={dropHandler}  className='dropdown' alt="drop" /></div>}
    </>
  )
}
export default SearchAdd;