import classes from './Post.module.css';
import { useParams, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { TweetContext } from '../../Contexts/UserContext/TweetContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faRetweet, faHeart, faChartSimple, faBookmark, faHandsAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';
import DateElement from '../../Tweet/DateElement';
import Button from '../../UI/Button';
import RepliesList from './RepliesList';
import Modal from '../../UI/Modal';

export default function Post() {
  const { tweetId, authorId } = useParams();
  const { getTweetById, toggleBookmark, toggleLike, getUserImgById, getAuthorById, getUsernameById, setAllTweets, allTweets } = useContext(TweetContext);
  const [tweetInput, setTweetInput] = useState('');
  const [error, setError] = useState(false);
  const tweet = getTweetById(tweetId);
  const iconSize = 'lg';

  const handleBookmark = () => {
    toggleBookmark(tweet);
  };

  const handleLike = () => {
    toggleLike(tweet);
  };

  const inputChangeHandler = (event) => {
    setTweetInput(event.target.value);
  };

  const postReplyHandler = () => {
    if (tweetInput.length) {
      const newReply = {
        id: new Date().getTime().toString(),
        authorId: '-1',
        postDate: new Date(),
        content: `@${getAuthorById(tweet.authorId)} - ${tweetInput}`,
        replies: [],
        repliesNr: '0',
        retweets: '0',
        likes: '0',
        views: '0',
        isBookmarked: false,
        isLiked: false,
      };
      tweet.replies.push(newReply);
      tweet.repliesNr = +tweet.repliesNr + 1;
      setAllTweets([...allTweets]);
      setTweetInput('');
    } else {
      setError(true);
    }
  };

  return (
    <div className={classes.wrapper}>
      {error && (
        <Modal
          title="Oh no!"
          body={`Reply body can't be empty!`}
          onHandleError={() => {
            setError(false);
          }}
        />
      )}
      <div className={classes.tweet}>
        <div className={classes.profileImgContainer}>
          <img className={classes.profileImg} src={getUserImgById(authorId)} alt="profile" />
        </div>
        <div className={classes.tweetContent}>
          <div className={classes.header}>
            <Link to={tweet.authorId === '-1' ? `/profile` : `/user/${tweet.authorId}`} className={classes.author}>
              {getAuthorById(authorId)}
            </Link>
            <div className={classes.username}>{getUsernameById(authorId)}</div>
            <DateElement postDate={tweet.postDate} />
          </div>
          <div className={classes.body}>{tweet.content}</div>
          <div className={classes.actions}>
            <div className={classes.action}>
              <button className={classes.reply}>
                <FontAwesomeIcon className={classes.iconReply} inverse icon={faComment} size={iconSize} />
                {tweet.repliesNr}
              </button>
            </div>
            <div className={classes.action}>
              <button className={classes.retweet}>
                <FontAwesomeIcon className={classes.iconRetweet} inverse icon={faRetweet} size={iconSize} />
                {tweet.retweets}
              </button>
            </div>
            <div className={classes.action}>
              <button className={`${classes.like} ${tweet.isLiked ? classes.likeOn : classes.likeOff}`} onClick={handleLike}>
                <FontAwesomeIcon
                  className={`${classes.iconLike} ${tweet.isLiked ? classes.iconLikeOn : classes.iconLikeOff}`}
                  inverse
                  icon={faHeart}
                  size={iconSize}
                />
                {tweet.likes}
              </button>
            </div>
            <div className={classes.action}>
              <button className={classes.views}>
                <FontAwesomeIcon className={classes.iconViews} inverse icon={faChartSimple} size={iconSize} />
                {tweet.views}
              </button>
            </div>
            <div className={classes.action}>
              <button className={`${classes.bookmark} ${tweet.isBookmarked ? classes.bookmarkOn : classes.bookmarkOff}`} onClick={handleBookmark}>
                <FontAwesomeIcon
                  className={`${classes.iconBookmark} ${tweet.isBookmarked ? classes.iconBookmarkOn : classes.iconBookmarkOff}`}
                  inverse
                  icon={faBookmark}
                  size={iconSize}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.formWrapper}>
        <div className={classes.userImgContainer}>
          <img src={getUserImgById('-1')} alt="User Profile Image" />
        </div>
        <div className={classes.inputWrapper}>
          <input type="text" placeholder="Type a reply" onChange={inputChangeHandler} value={tweetInput} />
          <Button className={classes.replyBtn} type="button" onClick={postReplyHandler}>
            Reply
          </Button>
        </div>
      </div>
      <RepliesList tweet={tweet} replies={tweet.replies} />
      <div className={classes.border}></div>
    </div>
  );
}
