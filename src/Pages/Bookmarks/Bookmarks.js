import TweetList from '../../Tweet/TweetList';
import { useContext } from 'react';
import { TweetContext } from '../../Contexts/TweetContext';
import classes from './Bookmarks.module.css';

export default function Home() {
  const { bookmarkedTweets } = useContext(TweetContext);
  return (
    <div>
      {!bookmarkedTweets.length && <h2 className={classes.defaultTitle}>Bookmark tweets and they will appear here!</h2>}
      {bookmarkedTweets.length && (
        <>
          <h2 className={classes.title}>Your bookmarked tweets await you here!</h2>
          <TweetList tweets={bookmarkedTweets} />
          <div className={classes.border}></div>
        </>
      )}
    </div>
  );
}
