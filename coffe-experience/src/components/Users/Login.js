import React, { useState, useEffect, Fragment } from 'react';
import Card from '../Card/Card';
import classes from './Login.module.css';
import Button from './Button';
import Input from './Input';
import * as actions from '../../store/app-actions';
import { useStore } from '../../store/app-context';
import ErrorModal from '../UI/ErrorModal';

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const {dispatch, state: {authState, errorState}, logInHandler} = useStore();
  const [emailValid, setEmailValid] = useState();
  const [passwordValid, setPasswordValid] = useState();

  useEffect(() => {
    console.log("errorState", errorState );
    const identifier = setTimeout(()=> {
      setFormIsValid(passwordValid && emailValid);
    }, 500)
    return () => {
      clearTimeout(identifier);
    }
  }, [emailValid, passwordValid, errorState])

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
    console.log('error State: ', errorState);
    logInHandler(authState.email, authState.password);
  };

  return (
    <Fragment >
      {errorState.errorType && <ErrorModal error={errorState}  />}
      <Card >
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
      </Card>
    </Fragment>
  );
};

export default Login;
