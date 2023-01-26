import classes from './Modal.module.css';
import Button from './Button';

export default function Modal(props) {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onHandleError}></div>
      <div className={classes.modal}>
        <p className={classes.modalTitle}>{props.title}</p>
        <p className={classes.modalBody}>{props.body}</p>
        <Button className={classes.modalButton} onClick={props.onHandleError}>
          Close
        </Button>
      </div>
    </>
  );
}
