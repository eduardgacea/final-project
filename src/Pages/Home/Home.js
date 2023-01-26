import TweetList from '../../Tweet/TweetList';
import TweetForm from '../../Tweet/TweetForm';
import { useContext, useEffect } from 'react';
import { TweetContext } from '../../Contexts/UserContext/TweetContext';

export default function Home() {
  const { allTweets, filteredTweets, setFilteredTweets } = useContext(TweetContext);

  useEffect(() => {
    setFilteredTweets([...allTweets]);
  }, [allTweets]);

  return (
    <div>
      <TweetForm />
      <TweetList tweets={filteredTweets} />
    </div>
  );
}
