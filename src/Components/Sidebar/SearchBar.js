import classes from './SearchBar.module.css';
import searchIcon from '../../Assets/searchIcon.svg';
import { useContext } from 'react';
import { TweetContext } from '../../Contexts/UserContext/TweetContext';

export default function SearchBar() {
  const { setFilteredTweets, allTweets } = useContext(TweetContext);

  const searchHandler = (event) => {
    event.preventDefault();
    const searchedWord = event.target[0].value;

    if (searchedWord.trim().length === 0) {
      setFilteredTweets([...allTweets]);
    } else {
      let dummyArray = [];
      dummyArray = allTweets.filter((tweet) => {
        return tweet.content.includes(searchedWord);
      });
      setFilteredTweets([...dummyArray]);
    }
  };

  return (
    <form className={classes.searchbar} onSubmit={searchHandler}>
      <img className={classes.icon} src={searchIcon} />
      <input className={classes.activeInput} type="text" placeholder="Search Twitter" />
      <input type="submit" value="test" hidden tabIndex="-1" />
    </form>
  );
}
