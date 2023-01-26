import classes from './Trend.module.css';

export default function Trend(props) {
  return (
    <li className={classes.trend}>
      <div className={classes.info}>
        <p className={classes.category}>{props.category}</p>
        <p className={classes.title}>{props.title}</p>
        <p className={classes.stats}>{props.stats}</p>
      </div>
      <div className={classes.more}>...</div>
    </li>
  );
}
