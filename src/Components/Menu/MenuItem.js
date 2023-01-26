import classes from './MenuItem.module.css';
import Button from '../../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowResize } from '../../CustomHooks/useWindowResize';

export default function MenuItem(props) {
  const windowWidth = useWindowResize();

  let iconSize = 'lg';

  if(windowWidth > 720) {
    iconSize = 'lg';
  }else if(windowWidth <= 720 && windowWidth > 405){
    iconSize = '1x';
  }else if(windowWidth <= 405){
    iconSize= 'sm';
  }

  return (
    <div onClick={props.throwError}>
      <Button type="button" className={classes.menuButton} onClick={props.onClick}>
        <FontAwesomeIcon inverse icon={props.icon} size={iconSize} />
        {windowWidth > 720 && props.name}
      </Button>
    </div>
  );
}
