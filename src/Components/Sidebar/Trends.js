import classes from './Trends.module.css'
import { trendsForYou } from '../../Data/TrendsForYou';
import Trend from './Trend';

export default function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <h3 className={classes.title} >Trends For You</h3>
      {trendsForYou.map((trend, index) => (
        <Trend key={index} category={trend.category} title={trend.title} stats={trend.stats} />
      ))}
    </div>
  );
}
