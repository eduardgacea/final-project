import classes from './RepliesList.module.css';
import Reply from './Reply';
import { useContext } from 'react';
import { TweetContext } from '../../Contexts/TweetContext';

export default function RepliesList(props) {
  const { getUserImgById, getAuthorById, getUsernameById } = useContext(TweetContext);
  return (
    <div className={classes.tweetList}>
      {props.replies.map((reply) => (
        <Reply
          tweet={props.tweet}
          reply={reply}
          id={reply.id}
          key={reply.id}
          profileImg={getUserImgById(reply.authorId)}
          author={getAuthorById(reply.authorId)}
          username={getUsernameById(reply.authorId)}
          postDate={reply.postDate}
          content={reply.content}
          repliesNr={reply.repliesNr}
          retweets={reply.retweets}
          likes={reply.likes}
          views={reply.views}
        />
      ))}
    </div>
  );
}
