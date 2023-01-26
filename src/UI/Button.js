import classes from './Button.module.css';

export default function Button(props) {
  return (
    <button className={`${classes.button}${props.className ? ` ${props.className}` : ''}`} onClick={props.onClick} type={props.type} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
