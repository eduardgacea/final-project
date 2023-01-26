import classes from './Menu.module.css';
import MenuItem from './MenuItem';
import { faHashtag, faHouse, faBell, faEnvelope, faBookmark, faList, faUser, faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext } from 'react';
import Modal from '../../UI/Modal';
import Button from '../../UI/Button';
import { UserContext } from '../../Contexts/UserContext/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import backToTopIcon from '../../Assets/backToTopIcon.svg';
import { ThemeContext } from '../../Contexts/UserContext/ThemeContext';
import { useWindowResize } from '../../CustomHooks/useWindowResize';

export default function Menu(props) {
  const windowWidth = useWindowResize();
  const [error, setError] = useState();
  const { setIsLoggedIn } = useContext(UserContext);
  const { toggleTheme, theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const throwError = () => {
    setError(true);
  };
  const catchError = () => {
    setError(false);
  };

  const logOutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const backToTopHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const themeToggleHandler = () => {
    toggleTheme();
  };

  return (
    <>
      {error && <Modal title={'Oops!'} body={'This section is a work in progress'} onHandleError={catchError} />}
      <div className={`${classes.menu}${props.className ? ` ${props.className}` : ``}`}>
        <div className={classes.top}>
          <img className={classes.logo} src={backToTopIcon} onClick={backToTopHandler} alt="logo" />

          <Link to="/" style={{ textDecoration: 'none' }}>
            <MenuItem icon={faHouse} name="Home" />
          </Link>

          {windowWidth > 500 && <MenuItem throwError={throwError} icon={faHashtag} name="Explore" />}
          {windowWidth > 500 && <MenuItem throwError={throwError} icon={faBell} name="Notifications" />}
          {windowWidth > 500 && <MenuItem throwError={throwError} icon={faEnvelope} name="Messages" />}

          <Link to="/bookmarks" style={{ textDecoration: 'none' }}>
            <MenuItem icon={faBookmark} name="Bookmarks" />
          </Link>

          {windowWidth > 500 && <MenuItem throwError={throwError} icon={faList} name="Lists" />}

          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <MenuItem icon={faUser} name="Profile" />
          </Link>

          {windowWidth > 500 && <MenuItem throwError={throwError} icon={faBars} name="More" />}
        </div>
        <div className={classes.bot}>
          <Button className={classes.toggleTheme} type="button" onClick={themeToggleHandler}>
            {windowWidth > 720 ? 'Toggle Theme' : 'Toggle'}
          </Button>
          <Button className={classes.logout} type="button" onClick={logOutHandler}>
            {windowWidth > 720 ? 'Log Out' : <FontAwesomeIcon icon={faSignOut} />}
          </Button>
        </div>
      </div>
    </>
  );
}
