import React, { useState, useEffect, useReducer, useContext } from 'react';
// import PropTypes from 'prop-types';
import Card from '../Card/Card';
import classes from './Login.module.css';
import Button from './Button';
import Input from './Input';
// import CoffeeContext from '../../store/coffee-context';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.value, isValid: action.value.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@') }
  }
  return {value: '', isValid: false }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'PASSWORD_INPUT':
      return {value: action.value, isValid: action.value.trim().length > 6}
    case 'PASSWORD_BLUR':
      return {value: state.value, isValid: state.value.trim().length > 6}
    default:
      return {value: '', isValid: false}
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null} );
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
  const {isValid: emaiIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;
  const cxt = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(()=> {
      // console.log('checking validity');
      setFormIsValid(passwordIsValid && emaiIsValid);
    }, 500)
    return () => {
      // console.log('keystroke');
      clearTimeout(identifier);
    }
  }, [emaiIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'PASSWORD_INPUT', value: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'PASSWORD_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    cxt.logInHandler(emailState.value, passwordState.value);
  };

  return (
    <Card >
      <form onSubmit={submitHandler}>
        <Input
          classes={classes}
          inputType='email'
          label='E-mail'
          id='email'
          valid={emaiIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          classes={classes}
          inputType='password'
          label='Password'
          id='password'
          valid={passwordIsValid}
          value={passwordState.value}
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
