import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faRetweet, faHeart, faChartSimple, faBookmark } from '@fortawesome/free-solid-svg-icons';
import classes from './Reply.module.css';
import { useContext } from 'react';
import { TweetContext } from '../../Contexts/UserContext/TweetContext';
import { Link } from 'react-router-dom';
import DateElement from '../../Tweet/DateElement';

export default function Reply(props) {
  const { toggleLikeReply, toggleBookmarkReply } = useContext(TweetContext);
  const iconSize = 'lg';

  const handleReplyBookmark = () => {
    toggleBookmarkReply(props.tweet , props.reply);
  };

  const handleReplyLike = () => {
    toggleLikeReply(props.tweet , props.reply);
  };

  return (
    <div className={classes.tweet}>
      <div className={classes.profileImgContainer}>
        <img className={classes.profileImg} src={props.profileImg} alt="profile" />
      </div>
      <div className={classes.tweetContent}>
        <div className={classes.header}>
          <Link to={props.reply.authorId === '-1' ? `/profile` : `/user/${props.reply.authorId}`} className={classes.author}>
            {props.author}
          </Link>
          <div className={classes.username}>{props.username}</div>
          <DateElement postDate={props.postDate} />
        </div>

        <div className={classes.body}>{props.content}</div>

        <div className={classes.actions}>
          <div className={classes.action}>
            <button className={classes.reply}>
              <FontAwesomeIcon className={classes.iconReply} inverse icon={faComment} size={iconSize} />
              {props.reply.replies.length}
            </button>
          </div>
          <div className={classes.action}>
            <button className={classes.retweet}>
              <FontAwesomeIcon className={classes.iconRetweet} inverse icon={faRetweet} size={iconSize} />
              {props.retweets}
            </button>
          </div>
          <div className={classes.action}>
            <button className={`${classes.like} ${props.reply.isLiked ? classes.likeOn : classes.likeOff}`} onClick={handleReplyLike}>
              <FontAwesomeIcon
                className={`${classes.iconLike} ${props.reply.isLiked ? classes.iconLikeOn : classes.iconLikeOff}`}
                inverse
                icon={faHeart}
                size={iconSize}
              />
              {props.likes}
            </button>
          </div>
          <div className={classes.action}>
            <button className={classes.views}>
              <FontAwesomeIcon className={classes.iconViews} inverse icon={faChartSimple} size={iconSize} />
              {props.views}
            </button>
          </div>
          <div className={classes.action}>
            <button className={`${classes.bookmark} ${props.reply.isBookmarked ? classes.bookmarkOn : classes.bookmarkOff}`} onClick={handleReplyBookmark}>
              <FontAwesomeIcon
                className={`${classes.iconBookmark} ${props.reply.isBookmarked ? classes.iconBookmarkOn : classes.iconBookmarkOff}`}
                inverse
                icon={faBookmark}
                size={iconSize}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
