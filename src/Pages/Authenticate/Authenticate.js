import { useContext, useReducer, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Authenticate.module.css';
import Button from '../../UI/Button';
import twitterLoginLogo from '../../Assets/twitterLoginLogo.svg';
import Modal from '../../UI/Modal';

const loginFormReducer = (state, action) => {
  switch (action.type) {
    case 'USERNAME_INPUT':
      return { ...state, username: action.payload };
    case 'PASSWORD_INPUT':
      return { ...state, password: action.payload };
    case 'LOGIN':
      return { ...state, username: '', password: '' };
    default:
      return { ...state, username: '', password: '' };
  }
};

export default function Authenticate() {
  const { storedUser, setIsLoggedIn } = useContext(UserContext);
  const [loginForm, dispatch] = useReducer(loginFormReducer, { username: '', password: '' });
  const [loginError, setLoginError] = useState();
  const navigate = useNavigate();

  const userNameChangeHandler = (event) => {
    dispatch({ type: 'USERNAME_INPUT', payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: 'PASSWORD_INPUT', payload: event.target.value });
  };

  const loginHandler = (event) => {
    event.preventDefault();
    if (loginForm.username === storedUser.username && loginForm.password === storedUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      dispatch({ type: 'LOGIN' });
      navigate('/');
    } else {
      setLoginError({ title: 'Error!', body: 'Enter your credentials in order to log in' });
    }
  };

  const errorHandler = () => {
    setLoginError(null);
  };

  return (
    <>
      {loginError && <Modal title={loginError.title} body={loginError.body} onHandleError={errorHandler} />}
      <div className={classes.backdrop}></div>
      <form className={classes.form}>
        <div className={classes.titleWrapper}>
          <p className={classes.title}>Login To Twitter</p>
          <img className={classes.logo} src={twitterLoginLogo} alt="twitter-logo" />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" onChange={userNameChangeHandler} value={loginForm.username} />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" onChange={passwordChangeHandler} value={loginForm.password} />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.action} onClick={loginHandler}>
            Log In
          </Button>
          <Link to="/createaccount" className={classes.action} >
            <Button type="button" className={classes.action}>
              Create Account
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
