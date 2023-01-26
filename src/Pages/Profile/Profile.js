import { useContext, useState, useReducer, useEffect } from 'react';
import { UserContext } from '../../Contexts/UserContext/UserContext';
import { TweetContext } from '../../Contexts/UserContext/TweetContext';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Profile.module.css';
import Button from '../../UI/Button';
import TweetList from '../../Tweet/TweetList';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'NAME_CHANGE':
      return { ...state, name: action.payload };
    case 'BIO_CHANGE':
      return { ...state, bio: action.payload };
    case 'LOCATION_CHANGE':
      return { ...state, location: action.payload };
    case 'SUBMIT':
      return { name: '', bio: '', location: '' };
    default:
      return { name: '', bio: '', location: '' };
  }
};

export default function Profile() {
  const { createdUser, setCreatedUser } = useContext(UserContext);

  useEffect(() => {
    setCreatedUser({
      id: '-1',
      name: localStorage.getItem('name'),
      username: `@${localStorage.getItem('username')}`,
      password: localStorage.getItem('password'),
      email: localStorage.getItem('email'),
      joinDate: localStorage.getItem('joinDate'),
      img: 'https://randomuser.me/api/portraits/men/62.jpg',
      bio: localStorage.getItem('bio') ? localStorage.getItem('bio') : '',
      location: localStorage.getItem('location') ? localStorage.getItem('location') : '',
      followers: [],
      following: [],
    });
  }, []);

  const { myTweets, likedTweets } = useContext(TweetContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showingMyTweets, setShowingMyTweets] = useState(true);
  const [formState, dispatch] = useReducer(formReducer, { name: '', bio: '', location: '' });
  const day = new Date(Date.parse(createdUser.joinDate)).toLocaleString('en-US', { day: '2-digit' });
  const month = new Date(Date.parse(createdUser.joinDate)).toLocaleString('en-US', { month: 'short' });
  const year = new Date(Date.parse(createdUser.joinDate)).toLocaleString('en-US', { year: 'numeric' });

  const nameChangeHandler = (event) => {
    dispatch({ type: 'NAME_CHANGE', payload: event.target.value });
  };
  const bioChangeHandler = (event) => {
    dispatch({ type: 'BIO_CHANGE', payload: event.target.value });
  };
  const locationChangeHandler = (event) => {
    dispatch({ type: 'LOCATION_CHANGE', payload: event.target.value });
  };

  const submitChangeHandler = (event) => {
    event.preventDefault();
    dispatch({ type: 'SUBMIT' });
    setIsEditing(false);
    setCreatedUser((state) => ({
      ...state,
      name: formState.name.trim().length > 0 ? formState.name : state.name,
      bio: formState.bio.trim().length > 0 ? formState.bio : state.bio,
      location: formState.location.trim().length ? formState.location : state.location,
    }));
    if (formState.name.trim().length) {
      localStorage.setItem('name', formState.name);
    }
    if (formState.bio.trim().length) {
      localStorage.setItem('bio', formState.bio);
    }
    if (formState.location.trim().length) {
      localStorage.setItem('location', formState.location);
    }
  };

  const toggleHistory = () => {
    setShowingMyTweets((state) => !state);
  };

  const toggleLikes = () => {
    setShowingMyTweets((state) => !state);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.profileImgContainer}>
          <img src={createdUser.img} className={classes.profileImg} alt="Profile" />
        </div>
        {!isEditing && (
          <Button
            type="button"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit Profile
          </Button>
        )}
        {isEditing && (
          <form className={classes.form}>
            <div className={classes.formInputs}>
              <div className={classes.formInput}>
                <label htmlFor="">Name</label>
                <input id="" onChange={nameChangeHandler} value={formState.name} />
              </div>
              <div className={classes.formInput}>
                <label htmlFor="">Bio</label>
                <input id="" onChange={bioChangeHandler} value={formState.bio} />
              </div>
              <div className={classes.formInput}>
                <label htmlFor="">Location</label>
                <input id="" onChange={locationChangeHandler} value={formState.location} />
              </div>
            </div>
            <Button type="submit" className={classes.submitButton} onClick={submitChangeHandler}>
              Save
            </Button>
          </form>
        )}
      </div>
      <div className={classes.profileInfo}>
        <div className={classes.userInfo}>
          <div className={classes.name}>{createdUser.name}</div>
          <div className={classes.username}>{createdUser.username}</div>
          <div className={classes.joinDate}>
            <FontAwesomeIcon size="sm" icon={faCalendarDays} />
            {`${day}-${month} ${year}`}
          </div>
        </div>
        <div className={classes.location}>{createdUser.location}</div>
        <div className={classes.bio}>{createdUser.bio}</div>
        <div className={classes.stats}>
          <div className={classes.stat}>{`${createdUser.following.length} Following `}</div>
          <div className={classes.stat}>{`${createdUser.followers.length} Followers`}</div>
        </div>
      </div>
      <div className={classes.actions}>
        <div className={classes.action}>
          <Button className={showingMyTweets ? classes.activeToggle : classes.inactiveToggle} type="button" onClick={toggleHistory}>
            Tweets
          </Button>
        </div>
        <div className={classes.action}>
          <Button className={showingMyTweets ? classes.inactiveToggle : classes.activeToggle} type="button" onClick={toggleLikes}>
            Likes
          </Button>
        </div>
      </div>
      {showingMyTweets && <h2 className={classes.myTweetsEmpty}>{myTweets.length === 0 ? 'Post tweets of your own and you will see them here!' : ''}</h2>}
      {!showingMyTweets && <h2 className={classes.myTweetsEmpty}>{likedTweets.length === 0 ? 'Like tweets and they will appear here' : ''}</h2>}
      <TweetList tweets={showingMyTweets ? myTweets : likedTweets} />
      <div className={classes.border}></div>
    </div>
  );
}
