import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import Menu from '../Components/Menu/Menu';
import classes from './HomeLayout.module.css';
import { useWindowResize } from '../CustomHooks/useWindowResize';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useContext } from 'react';

export default function HomeLayout() {
  const windowWidth = useWindowResize();
  const {theme} = useContext(ThemeContext);

  return (
      <div className={`${classes.wrapper} ${theme==='dark'? classes.dark : classes.light}`}>
        <Menu />
        <Outlet />
        {windowWidth > 1240 && <Sidebar />}
      </div>
  );
}
