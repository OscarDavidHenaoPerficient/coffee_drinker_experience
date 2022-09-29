import React, { useState, useEffect, Fragment } from 'react';
import Card from '../components/Card/Card';
import classes from './Login.module.css';
import Button from '../components/Users/Button';
import Input from '../components/Users/Input';
import * as actions from '../store/app-actions';
import { useStore } from '../store/app-context';
import ErrorModal from '../components/UI/ErrorModal';
import {
  useNavigate,
  useLocation,
} from "react-router-dom"; 

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const {dispatch, state: {authState, errorState}, logInHandler} = useStore();
  const [emailValid, setEmailValid] = useState();
  const [passwordValid, setPasswordValid] = useState();
  const navigate = useNavigate()
  const location = useLocation()
  let from = location.state?.from?.pathname || '/coffeeStyles';

  useEffect(() => {
    const identifier = setTimeout(()=> {
      setFormIsValid(passwordValid && emailValid);
    }, 500)
    return () => {
      clearTimeout(identifier);
    }
  }, [emailValid, passwordValid, errorState, authState])

  const emailChangeHandler = (event) => {
    dispatch(actions.setEmail(event.target.value));
    setEmailValid(event.target.value.includes('@'))
  };

  const passwordChangeHandler = (event) => {
    dispatch(actions.setPassword(event.target.value));
    setPasswordValid(event.target.value.trim().length > 6)
  };

  const validateEmailHandler = (event) => {
    setEmailValid(event.target.value.includes('@'));
  };

  const validatePasswordHandler = (event) => {
    setPasswordValid(event.target.value.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    logInHandler(authState.email, authState.password);
    console.log('error State: ', errorState);
    if (authState.isLoggedIn === true) navigate(from, {replace: true});
  };

  return (
    <Fragment>
      {errorState.errorType && <ErrorModal error={errorState}  />}
      <Card >
        {authState.isLoggedIn === true ? 
        <p> Loading...</p> :  
          <form onSubmit={submitHandler}>
            <Input
              classes={classes}
              inputType='email'
              label='E-mail'
              id='email'
              valid={emailValid}
              value={authState.email}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            ></Input>
            <Input
              classes={classes}
              inputType='password'
              label='Password'
              id='password'
              valid={passwordValid}
              value={authState.password}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            >
            </Input>
            <div className={classes.actions}>
              <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                Login
              </Button>
            </div>
          </form>
        }
      </Card>
    </Fragment>
  );
};

export default Login;
