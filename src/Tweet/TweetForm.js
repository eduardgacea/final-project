import { useState, useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import { TweetContext } from '../Contexts/TweetContext';
import Button from '../UI/Button';
import classes from './TweetForm.module.css';
import Modal from '../UI/Modal';

export default function TweetForm() {
  const [isComposing, setIsComposing] = useState(false);
  const [tweetInput, setTweetInput] = useState('');
  const [error, setError] = useState(false);
  const { createdUser } = useContext(UserContext);
  const { postNewTweet } = useContext(TweetContext);

  const inputChangeHandler = (event) => {
    setTweetInput(event.target.value);
  };

  const tweetPostHandler = () => {
    if (!tweetInput.trim().length) {
      setError(true);
    } else {
      setIsComposing(false);
      postNewTweet(tweetInput);
      setTweetInput('');
    }
  };

  return (
    <div className={classes.form}>
      {error && (
        <Modal
          title="Oops!"
          body={`You can't post empty tweets!`}
          onHandleError={() => {
            setError(false);
          }}
        />
      )}
      <div className={classes.profileImgContainer}>
        <img className={classes.profileImg} src={createdUser.img} alt="Profile" />
      </div>
      <div className={`${classes.inputContainer} ${isComposing ? classes.composing : classes.notComposing}`}>
        {isComposing && <input type="text" placeholder={`What's happening?`} onChange={inputChangeHandler} value={tweetInput} maxLength="280" />}
        <div className={classes.actions}>
          {isComposing && (
            <Button type="button" onClick={tweetPostHandler}>
              Tweet
            </Button>
          )}
          {!isComposing && (
            <Button
              type="button"
              onClick={() => {
                setIsComposing(true);
              }}
            >
              Compose
            </Button>
          )}
          {isComposing && (
            <Button
              className={classes.cancel}
              type="button"
              onClick={() => {
                setIsComposing(false);
                setTweetInput('');
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
