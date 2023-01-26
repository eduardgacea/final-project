import classes from './MenuItem.module.css';
import Button from '../../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowResize } from '../../CustomHooks/useWindowResize';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { useContext } from 'react';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export default function MenuItem(props) {
  const windowWidth = useWindowResize();
  const { theme } = useContext(ThemeContext);
  let iconSize = 'lg';

  if (windowWidth > 720) {
    iconSize = 'lg';
  } else if (windowWidth <= 720 && windowWidth > 405) {
    iconSize = '1x';
  } else if (windowWidth <= 405) {
    iconSize = 'sm';
  }

  return (
    <div onClick={props.throwError}>
      <Button type="button" className={`${classes.menuButton} ${theme==='dark'? classes.darkBtn : classes.lightBtn}`} onClick={props.onClick} >
        <FontAwesomeIcon icon={props.icon} size={iconSize} color={theme==='dark' ? 'white' : 'black'} />
        {windowWidth > 720 && props.name}
      </Button>
    </div>
  );
}
