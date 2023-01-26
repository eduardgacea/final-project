import Tweet from './Tweet';
import { useContext } from 'react';
import { TweetContext } from '../Contexts/UserContext/TweetContext';
import classes from './TweetList.module.css';

export default function TweetList(props) {
  const { getUserImgById, getAuthorById, getUsernameById } = useContext(TweetContext);
  return (
    <div className={classes.tweetList}>
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
    <div className={classes.border} ></div>
    </div>
  );
}
