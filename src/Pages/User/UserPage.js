import classes from './UserPage.module.css';
import { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../Data/Users';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../UI/Button';

export default function UserPage() {
  const { id } = useParams();
  const user = getUserById(id);
  const { followUser, createdUser } = useContext(UserContext);

  const [amFollowing, setAmFollowing] = useState(() => {
    if (!createdUser.following.length) return false;
    for (let user of createdUser.following) {
      return id === user.id;
    }
  });

  const day = user.joinDate.toLocaleString('en-US', { day: '2-digit' });
  const month = user.joinDate.toLocaleString('en-US', { month: 'short' });
  const year = user.joinDate.toLocaleString('en-US', { year: 'numeric' });

  const followHandler = () => {
    followUser(user);
    setAmFollowing((state) => !state);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <div className={classes.profileImgContainer}>
          <img src={user.img} className={classes.profileImg} alt="Profile" />
        </div>
        <Button className={amFollowing ? classes.unfollowBtn : classes.followBtn} type="button" onClick={followHandler}>
          {amFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
      <div className={classes.profileInfo}>
        <div className={classes.userInfo}>
          <div className={classes.name}>{user.name}</div>
          <div className={classes.username}>{user.username}</div>
          <div className={classes.joinDate}>
            <FontAwesomeIcon size="sm" icon={faCalendarDays} />
            {`${day}-${month} ${year}`}
          </div>
        </div>
        <div className={classes.location}>{user.location}</div>
        <div className={classes.bio}>{user.bio}</div>
        <div className={classes.stats}>
          <div className={classes.stat}>{`${user.followingNr} Following `}</div>
          <div className={classes.stat}>{`${amFollowing ? +user.followersNr + 1 : +user.followersNr} Followers`}</div>
        </div>
      </div>
    </div>
  );
}
