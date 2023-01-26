import { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { Users } from '../../Data/Users';
import { Tweets } from '../../Data/Tweets';

const TweetContext = createContext(null);

export default function TweetContextProvider(props) {
  const { createdUser } = useContext(UserContext);
  const [allTweets, setAllTweets] = useState(
    Tweets.sort((a, b) => {
      const postDateA = a.postDate;
      const postDateB = b.postDate;
      if (postDateA < postDateB) {
        return 1;
      }
      if (postDateA > postDateB) {
        return -1;
      }
      return 0;
    })
  );
  const [filteredTweets , setFilteredTweets] = useState([]);
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [myTweets, setMyTweets] = useState([]);

  const toggleBookmark = (tweet) => {
    const index = findTweetInListById(tweet.id, bookmarkedTweets);
    if (index === -1) {
      bookmarkedTweets.push(tweet);
      for (let twt of allTweets) {
        const idx = findTweetInListById(twt.id, bookmarkedTweets);
        if (idx !== -1) {
          twt.isBookmarked = true;
        }
      }
    } else {
      bookmarkedTweets.splice(index, 1);
      for (let twt of allTweets) {
        const idx = findTweetInListById(twt.id, bookmarkedTweets);
        if (idx === -1) {
          twt.isBookmarked = false;
        }
      }
    }
    setBookmarkedTweets([...bookmarkedTweets]);
    setAllTweets([...allTweets]);
  };

  const toggleLike = (tweet) => {
    const index = findTweetInListById(tweet.id, likedTweets);
    if (index === -1) {
      likedTweets.push(tweet);
      for (let twt of allTweets) {
        const idx = findTweetInListById(twt.id, likedTweets);
        if (idx !== -1 && !twt.isLiked) {
          twt.isLiked = true;
          twt.likes = (+twt.likes + 1).toString();
        }
      }
    } else {
      likedTweets.splice(index, 1);
      for (let twt of allTweets) {
        const idx = findTweetInListById(twt.id, likedTweets);
        if (idx === -1 && twt.isLiked) {
          twt.isLiked = false;
          twt.likes = (+twt.likes - 1).toString();
        }
      }
    }
    setLikedTweets([...likedTweets]);
    setAllTweets([...allTweets]);
  };

  const toggleBookmarkReply = (reply) => {
    const indexInBookmarks = findTweetInListById(reply.id, bookmarkedTweets);
    if (indexInBookmarks === -1) {
      bookmarkedTweets.push(reply);
    } else {
      bookmarkedTweets.splice(indexInBookmarks, 1);
    }
    setBookmarkedTweets([...bookmarkedTweets]);
  };

  const toggleLikeReply = (reply) => {
    const indexInLikes = findTweetInListById(reply.id, likedTweets);
    if (indexInLikes === -1) {
      likedTweets.push(reply);
    } else {
      likedTweets.splice(indexInLikes, 1);
    }
    setLikedTweets([...likedTweets]);
  };

  const findTweetInListById = (id, list) => {
    const tweetIndex = list.findIndex((listTweet) => listTweet.id === id);
    return tweetIndex;
  };

  const getUserImgById = (id) => {
    if (id === '-1') return createdUser.img;
    return Users[id].img;
  };

  const getAuthorById = (id) => {
    if (id === '-1') return createdUser.name;
    return Users[id].name;
  };

  const getUsernameById = (id) => {
    if (id === '-1') return createdUser.username;
    return Users[id].username;
  };

  const postNewTweet = (tweetContent) => {
    const newTweet = {
      id: new Date().getTime().toString(),
      authorId: '-1',
      postDate: new Date(),
      content: tweetContent,
      replies: [],
      repliesNr: '0',
      retweets: '0',
      likes: '0',
      views: '0',
      isBookmarked: false,
      isLiked: false,
    };
    setAllTweets((state) => [newTweet, ...state]);
    setMyTweets((state) => [newTweet, ...state]);
  };

  const getTweetById = (id) => {
    for (let tweet of allTweets) {
      if (tweet.id === id) {
        return tweet;
      }
    }
  };

  return (
    <TweetContext.Provider
      value={{
        allTweets,
        bookmarkedTweets,
        likedTweets,
        myTweets,
        filteredTweets,
        setAllTweets,
        setMyTweets,
        getUserImgById,
        getAuthorById,
        getUsernameById,
        postNewTweet,
        toggleBookmark,
        toggleLike,
        getTweetById,
        toggleBookmarkReply,
        toggleLikeReply,
        setFilteredTweets
      }}
    >
      {props.children}
    </TweetContext.Provider>
  );
}

export { TweetContext };
