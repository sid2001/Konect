import { useContext } from 'react'
import { UserContext } from '../Context/userContext';
import Forum from './Forum';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import '/src/styles/home.css';

function Home () {
  const userContext = useContext(UserContext);
  return (
    <div id='home-container'>
      <Navbar/>
      <div id='home-wrapper'>
        <Dashboard/>
        <Forum/>
      </div>
    </div>
  )
}
export default Home;