import '/src/styles/navbar.css';
import searchIcon from '/src/assets/search.svg';
import { UserContext } from '../Context/userContext';
import chatIcon from '/src/assets/chat-icon.png';
import loginIcon from '/src/assets/login-icon.png';
import logoutIcon from '/src/assets/logout-icon.png';
import logo from '/src/assets/logo4.png';
import nameLogo from '/src/assets/name-logo.png';
import { useContext } from 'react';
function Navbar(){
  const userContext = useContext(UserContext);
  console.log("navbar: ",userContext.user);
  return(
    <div id='navbar'>
      <div id='nav-left'>
        <img className='logo' src={logo} alt="" />
        <img className='logo name' src={nameLogo} alt="" />
      </div>
      {/* <div id="search-post-wrapper"> */}
        {/* <div id='filter-search-wrapper'> */}
          {/* <select name="filter" id="filter-search">
            <option className='option' value="0">Popular</option>
            <option className='option' value="1">New</option>
            <option className='option' value="2">Old</option>
          </select> */}
          <div id='search-bar-wrapper'>
            <img id='search-icon' src={searchIcon} alt="s" />
            <input placeholder="search" id='search-bar' type="text" />
          </div>
        {/* </div> */}
      {/* </div> */}
      <div id='nav-right'>
        <img className='nav-icon' src={chatIcon} alt="ci" />
        {userContext.user.isLoggedIn===false?<img className='nav-icon' src={loginIcon} alt="li" />:<img className='nav-icon' src={logoutIcon} alt="li" />}
        <svg className='nav-icon' fill="currentColor" height="20"  viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 18h1a2 2 0 0 1-4 0h3Zm8-3.792v.673A1.12 1.12 0 0 1 17.883 16H2.117A1.12 1.12 0 0 1 1 14.881v-.673a3.947 3.947 0 0 1 1.738-3.277A2.706 2.706 0 0 0 3.926 8.7V7.087a6.07 6.07 0 0 1 12.138 0l.01 1.613a2.7 2.7 0 0 0 1.189 2.235A3.949 3.949 0 0 1 19 14.208Zm-1.25 0a2.7 2.7 0 0 0-1.188-2.242A3.956 3.956 0 0 1 14.824 8.7V7.088a4.819 4.819 0 1 0-9.638 0v1.615a3.956 3.956 0 0 1-1.738 3.266 2.7 2.7 0 0 0-1.198 2.239v.542h15.5v-.542Z"></path>
    </svg>
      </div>
    </div>
  )
}

export default Navbar;