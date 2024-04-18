import { useContext } from 'react'
// import { UserContext } from '/src/Context/userContext';
import Forum from './Forum';
import Navbar from './Navbar';
import {PostFilterContext} from '/src/components/Context/ForumContext.js';
import Dashboard from './Dashboard';
import QuickAccess from './QuickAccess';
import '/src/styles/home.css';

function Home () {
  // const userContext = useContext(UserContext);
  return (
    <div id='home-container'>
      <Navbar/>
      <div id='home-wrapper'>
        <Dashboard/>
        <Forum/>
        <QuickAccess/>
      </div>
    </div>
  )
}
export default Home;