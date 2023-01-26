import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faRetweet, faHeart, faChartSimple, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { TweetContext } from '../Contexts/UserContext/TweetContext';
import { Link } from 'react-router-dom';
import classes from './Tweet.module.css';
import DateElement from './DateElement';
import { useWindowResize } from '../CustomHooks/useWindowResize';

export default function Tweet(props) {
  
  const windowWidth = useWindowResize();

  let iconSize = 'lg';
  
  if(windowWidth > 720) {
    iconSize = 'lg';
  }else if(windowWidth <= 720 && windowWidth > 405){
    iconSize = '1x';
  }else if(windowWidth <= 405){
    iconSize= 'sm';
  }

  const { toggleBookmark, toggleLike } = useContext(TweetContext);

  const handleBookmark = () => {
    toggleBookmark(props.tweet);
  };

  const handleLike = () => {
    toggleLike(props.tweet);
  };

  return (
    <div className={classes.tweet}>
      <div className={classes.profileImgContainer}>
        <img className={classes.profileImg} src={props.profileImg} alt="profile" />
      </div>
      <div className={classes.tweetContent}>
        <div className={classes.header}>
          <Link to={props.tweet.authorId === '-1' ? `/profile` : `/user/${props.tweet.authorId}`} className={classes.author}>
            {props.author}
          </Link>
          <div className={classes.username}>{props.username}</div>
          <DateElement postDate={props.postDate} />
        </div>

        <Link style={{ textDecoration: 'none' }} to={`/post/${props.tweet.authorId}/${props.tweet.id}`}>
          <div className={classes.body}>{props.content}</div>
        </Link>

        <div className={classes.actions}>
          <div className={classes.action}>
            <button className={classes.reply}>
              <FontAwesomeIcon className={classes.iconReply} inverse icon={faComment} size={iconSize} />
              {props.tweet.replies.length}
            </button>
          </div>
          <div className={classes.action}>
            <button className={classes.retweet}>
              <FontAwesomeIcon className={classes.iconRetweet} inverse icon={faRetweet} size={iconSize} />
              {props.retweets}
            </button>
          </div>
          <div className={classes.action}>
            <button className={`${classes.like} ${props.tweet.isLiked ? classes.likeOn : classes.likeOff}`} onClick={handleLike}>
              <FontAwesomeIcon
                className={`${classes.iconLike} ${props.tweet.isLiked ? classes.iconLikeOn : classes.iconLikeOff}`}
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
            <button className={`${classes.bookmark} ${props.tweet.isBookmarked ? classes.bookmarkOn : classes.bookmarkOff}`} onClick={handleBookmark}>
              <FontAwesomeIcon
                className={`${classes.iconBookmark} ${props.tweet.isBookmarked ? classes.iconBookmarkOn : classes.iconBookmarkOff}`}
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
