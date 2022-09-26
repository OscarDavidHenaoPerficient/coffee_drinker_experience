import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import classes from './Login.module.css';
import Button from './Button';
import Input from './Input';
import * as actions from '../../store/app-actions';
import { useStore } from '../../store/app-context';

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const {dispatch, state: {authState}, logInHandler} = useStore();
  const [emailValid, setEmailValid] = useState();
  const [passwordValid, setPasswordValid] = useState();

  useEffect(() => {
    const identifier = setTimeout(()=> {
      console.log('checking validity');
      setFormIsValid(passwordValid && emailValid);
    }, 500)
    return () => {
      console.log('keystroke');
      clearTimeout(identifier);
    }
  }, [emailValid, passwordValid])

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
  };

  return (
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
  );
};

export default Login;
