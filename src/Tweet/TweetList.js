import Tweet from './Tweet';
import { useContext } from 'react';
import { TweetContext } from '../Contexts/TweetContext';
import classes from './TweetList.module.css';
import { ThemeContext } from '../Contexts/ThemeContext';

export default function TweetList(props) {
  const { getUserImgById, getAuthorById, getUsernameById } = useContext(TweetContext);
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${classes.tweetList} ${theme === 'dark' ? classes.dark : classes.light}`}>
      {props.tweets.map((tweet) => (
        <Tweet
          tweet={tweet}
          id={tweet.id}
          key={tweet.id}
          profileImg={getUserImgById(tweet.authorId)}
          author={getAuthorById(tweet.authorId)}
          username={getUsernameById(tweet.authorId)}
          postDate={tweet.postDate}
          content={tweet.content}
          repliesNr={tweet.repliesNr}
          retweets={tweet.retweets}
          likes={tweet.likes}
          views={tweet.views}
        />
      ))}
      <div className={classes.border}></div>
    </div>
  );
}
