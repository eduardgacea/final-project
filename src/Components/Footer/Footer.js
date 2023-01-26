import classes from './Footer.module.css';

export default function Footer() {
  return (
    <ul className={classes.items}>
      <li className={classes.item}>Terms of Service</li>
      <li className={classes.item}>Privacy Policy</li>
      <li className={classes.item}>Cookie Policy</li>
      <li className={classes.item}>Accesibility</li>
      <li className={classes.item}>Ads info</li>
      <li className={classes.item}>More...</li>
      <li>2023 Twitter, Inc.</li>
    </ul>
  );
}
