import React, { useState, useEffect, useReducer, useContext } from 'react';
import Card from '../Card/Card';
import classes from './Login.module.css';
import Button from './Button';
import Input from './Input';
import AuthContext from '../../store/auth-context';
import CoffeeContext from '../../store/coffee-context';

const stateReducer = (state, action) => {
  if (Object.keys(action).find(word => word === 'email')) {
    switch (action.email.type) {
      case 'USER_INPUT':
        return { 
          email: {value:  action.email.value, isValid: action.email.value.includes('@')},
          password: {value: state.password.value, isValid: state.password.isValid}
        }
      case 'INPUT_BLUR':
        return { 
          email: {value: state.email.value, isValid: state.email.value.includes('@')},
          password: {value: state.password.value, isValid: state.password.isValid}
        }
      default:
        return {
          email: {value: '', isValid: false},
          password: {value: state.password.value, isValid: state.password.isValid}
        }
    }
  } else {
    switch (action.password.type) {
      case 'PASSWORD_INPUT':
        return { 
          email: {value: state.email.value, isValid: state.email.isValid},
          password: { value: action.password.value, isValid: action.password.value.trim().length > 6},
        }
      case 'PASSWORD_BLUR':
        return { 
          email: {value: state.email.value, isValid: state.email.isValid},
          password: {value: state.password.value, isValid: state.password.value.trim().length > 6},
        }
      default:
        return { 
          email: {value: state.email.value, isValid: state.email.isValid},
          password: {value: '', isValid: false},
        }
    }
  }
};

const initialState = {
  email: {value: '', isValid: null},
  password: {value: '', isValid: null}
}

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [state, dispatchState] = useReducer(stateReducer, initialState );
 //  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});
  const {isValid: emaiIsValid} = state.email;
  const {isValid: passwordIsValid} = state.password;

  const cxt = useContext(CoffeeContext);

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
    dispatchState({ email: {type: 'USER_INPUT', value: event.target.value }});
  };

  const passwordChangeHandler = (event) => {
    dispatchState({ password: {type: 'PASSWORD_INPUT', value: event.target.value}});    
  };

  const validateEmailHandler = () => {
    dispatchState({ email: {type: 'INPUT_BLUR'}});    
  };

  const validatePasswordHandler = () => {
    dispatchState({ password: {type: 'PASSWORD_BLUR'}});    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    cxt.authState.logInHandler(state.email.value, state.password.value);
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
          value={state.email.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          classes={classes}
          inputType='password'
          label='Password'
          id='password'
          valid={passwordIsValid}
          value={state.password.value}
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
