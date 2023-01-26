import './Sidebar.module.css';
import Trends from './Trends';
import SearchBar from './SearchBar';
import Footer from '../Footer/Footer';
import classes from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <div className={classes.sidebar} >
      { window.location.href === 'http://localhost:3000/' && <SearchBar />}
      <Trends />
      <Footer/>
    </div>
  );
}
