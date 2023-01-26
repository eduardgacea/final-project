import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Authenticate from './Pages/Authenticate/Authenticate';
import Home from './Pages/Home/Home';
import CreateAccount from './Pages/Authenticate/CreateAccount';
import HomeLayout from './Layouts/HomeLayout';
import Profile from './Pages/Profile/Profile';
import Bookmarks from './Pages/Bookmarks/Bookmarks';
import UserPage from './Pages/User/UserPage';
import Post from './Pages/Post/Post';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/post/:authorId/:tweetId" element={<Post />} />
      </Route>
      <Route path="/login" element={<Authenticate />} />
      <Route path="/createaccount" element={<CreateAccount />} />
    </Routes>
  );
}

export default App;
