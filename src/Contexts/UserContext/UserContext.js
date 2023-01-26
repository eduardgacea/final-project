import { createContext, useState, useEffect } from 'react';
import { Users } from '../../Data/Users';

const UserContext = createContext(null);

export default function UserContextProvider(props) {
  const following = Users.filter((elem) => {
    return elem.isFollowedByMe;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [storedUser, setStoredUser] = useState();
  const [createdUser, setCreatedUser] = useState({
    id: '-1',
    name: localStorage.getItem('name'),
    username: `@${localStorage.getItem('username')}`,
    password: localStorage.getItem('password'),
    email: localStorage.getItem('email'),
    joinDate: new Date(),
    img: 'https://randomuser.me/api/portraits/men/62.jpg',
    bio: localStorage.getItem('bio') ? localStorage.getItem('bio') : '',
    location: localStorage.getItem('location') ? localStorage.getItem('location') : '',
    followers: [],
    following: [],
  });

  const followUser = (user) => {
    const newFollowing = [...createdUser.following];
    const index = createdUser.following.findIndex((followedUser) => followedUser.id === user.id);
    if (index === -1) {
      newFollowing.push(user);
    } else {
      newFollowing.splice(index, 1);
    }
    setCreatedUser({ ...createdUser, following: newFollowing });
  };

  useEffect(() => {
    setStoredUser({
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    });
  }, []);

  const storeUser = (name, email, username, password) => {
    localStorage.setItem('name', `${name}`);
    localStorage.setItem('email', `${email}`);
    localStorage.setItem('username', `${username}`);
    localStorage.setItem('password', `${password}`);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, storedUser, setStoredUser, storeUser, createdUser, setCreatedUser, followUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext };
