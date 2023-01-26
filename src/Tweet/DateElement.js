import classes from './DateElement.module.css';

export default function DateElement ({ postDate }) {
  const day = postDate.toLocaleString('en-US', { day: '2-digit' });
  const month = postDate.toLocaleString('en-US', { month: 'short' });
  const year = postDate.toLocaleString('en-US', { year: 'numeric' });

  return <div className={classes.date}>{`${day}-${month} ${year}`}</div>;
}
