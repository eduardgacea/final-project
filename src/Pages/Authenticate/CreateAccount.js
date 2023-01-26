import { useReducer, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext/UserContext';
import { Link } from 'react-router-dom';
import classes from './CreateAccount.module.css';
import Button from '../../UI/Button';
import twitterLoginLogo from '../../Assets/twitterLoginLogo.svg';

const formStateReducer = (state, action) => {
  const checkName = (name) => {
    return name.trim().length > 1;
  };
  const checkEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };
  const checkUserName = (username) => {
    return username.trim().length > 1;
  };
  const checkPassword = (password) => {
    return password.trim().length > 6;
  };
  const checkForm = (name, email, username, password) => {
    return checkName(name) && checkEmail(email) && checkUserName(username) && checkPassword(password);
  };
  switch (action.type) {
    case 'NAME_INPUT':
      return {
        ...state,
        name: action.payload,
        isNameValid: checkName(action.payload),
        isFormValid: checkForm(action.payload, state.email, state.username, state.password),
      };
    case 'EMAIL_INPUT':
      return {
        ...state,
        email: action.payload,
        isEmailValid: checkEmail(action.payload),
        isFormValid: checkForm(state.name, action.payload, state.username, state.password),
      };
    case 'USERNAME_INPUT':
      return {
        ...state,
        username: action.payload,
        isUserNameValid: checkUserName(action.payload),
        isFormValid: checkForm(state.name, state.email, action.payload, state.password),
      };
    case 'PASSWORD_INPUT':
      return {
        ...state,
        password: action.payload,
        isPasswordValid: checkPassword(action.payload),
        isFormValid: checkForm(state.name, state.email, state.username, action.payload),
      };
    case 'CREATE_USER':
      return {
        name: '',
        isNameValid: undefined,
        email: '',
        isEmailValid: undefined,
        username: '',
        isUserNameValid: undefined,
        password: '',
        isPasswordValid: undefined,
        isFormValid: false,
      };
    default:
      return {
        name: '',
        isNameValid: undefined,
        email: '',
        isEmailValid: undefined,
        username: '',
        isUserNameValid: undefined,
        password: '',
        isPasswordValid: undefined,
        isFormValid: false,
      };
  }
};

export default function CreateAccount() {
  const { storeUser, setStoredUser } = useContext(UserContext);
  const [formState, dispatch] = useReducer(formStateReducer, {
    name: '',
    isNameValid: undefined,
    email: '',
    isEmailValid: undefined,
    username: '',
    isUserNameValid: undefined,
    password: '',
    isPasswordValid: undefined,
    isFormValid: false,
  });

  const nameChangeHandler = (event) => {
    dispatch({ type: 'NAME_INPUT', payload: event.target.value });
  };

  const emailChangeHandler = (event) => {
    dispatch({ type: 'EMAIL_INPUT', payload: event.target.value });
  };

  const userNameChangeHandler = (event) => {
    dispatch({ type: 'USERNAME_INPUT', payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: 'PASSWORD_INPUT', payload: event.target.value });
  };

  const createUserHandler = () => {
    dispatch({ type: 'CREATE_USER' });
    storeUser(formState.name, formState.email, formState.username, formState.password);
    setStoredUser({ name: formState.name, email: formState.email, username: formState.username, password: formState.password });
    localStorage.removeItem('bio');
    localStorage.removeItem('location');
  };

  return (
    <>
      <div className={classes.backdrop}></div>
      <form className={classes.form}>
        <div className={classes.titleWrapper}>
          <p className={classes.title}>Create Twitter Account</p>
          <img className={classes.logo} src={twitterLoginLogo} alt="twitter-logo" />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            className={formState.isNameValid || formState.isNameValid === undefined ? '' : classes.invalid}
            id="name"
            type="text"
            onChange={nameChangeHandler}
            value={formState.name}
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            className={formState.isEmailValid || formState.isEmailValid === undefined ? '' : classes.invalid}
            id="email"
            type="email"
            onChange={emailChangeHandler}
            value={formState.email}
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input
            className={formState.isUserNameValid || formState.isUserNameValid === undefined ? '' : classes.invalid}
            id="username"
            type="text"
            onChange={userNameChangeHandler}
            value={formState.username}
          />
        </div>
        <div className={classes.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            className={formState.isPasswordValid || formState.isPasswordValid === undefined ? '' : classes.invalid}
            id="password"
            type="password"
            onChange={passwordChangeHandler}
            value={formState.password}
          />
        </div>
        <div className={classes.actions}>
          <Link to="/login">
            <Button type="submit" disabled={!formState.isFormValid} className={classes.action} onClick={createUserHandler}>
              Create Account
            </Button>
          </Link>
          <Link to="/login">
            <Button type="button" className={classes.action}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
