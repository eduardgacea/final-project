import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';
import Menu from '../Components/Menu/Menu';
import classes from './HomeLayout.module.css';
import { useWindowResize } from '../CustomHooks/useWindowResize';
import Button from '../UI/Button';

export default function HomeLayout() {
  const windowWidth = useWindowResize();

  return (
      <div className={classes.wrapper}>
        <Menu />
        <Outlet />
        {windowWidth > 1240 && <Sidebar />}
      </div>
  );
}
