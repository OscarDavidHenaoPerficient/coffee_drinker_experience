import React, {useEffect, useReducer, useContext, useMemo, useCallback} from "react";
import PropTypes from 'prop-types';
import { useFetch, useAuth, usePreparations } from "../fetchers/fetchers";
import initialState from './app-models';
import AppContext from './index'
import * as actions from './app-actions';
import appReducer from "./app-reducer";

export const useStore = () => useContext(AppContext);

const localStorageSetter = (field, value) => {
  localStorage.setItem(field, value);
};

export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const {error, sendRequest} = useFetch();
  const {error: errorAuth, requestAuth} = useAuth();
  const {errorPreparations, preparationsSetter} = usePreparations();

  const dispatchDataRequest = useCallback((data) => {
    if (error) {
      dispatch(actions.setErrorState({type: 'Error at fetching', message: error.message})) 
      dispatch(actions.setCoffeeInitialData({}))
    } else if (data) {
      dispatch(actions.setCoffeeInitialData(data))
    } 
  }, [error]);

  const dispatchDataPreparations = useCallback((data)=> {
    if (errorPreparations) {
      dispatch(actions.setErrorState({type: 'Error at fetching preparations', message: errorPreparations.message})) 
      dispatch(actions.setPreparations([]))
    } else if (data) {
      dispatch(actions.setPreparations(data))
    }
  }, [errorPreparations]);

  const dispatchDataAuth = useCallback((data, email, password) => {
    const existingEmail = data.find(user => user.username === email);
    if (existingEmail) {
      if(existingEmail.password === password) {
        dispatch(actions.setIsLoggedIn(true));
        localStorageSetter('userLogged', 'true');
        localStorageSetter('token', existingEmail.token);
      } else {
        dispatch(actions.setIsLoggedIn(false));
        localStorageSetter('userLogged', 'false');
        dispatch(actions.setErrorState({errorType: 'Authentication error', message: 'Your E-mail or password are not correct, please enter values again'}))
        throw new Error('Wrong password');
      }
    } else {
      dispatch(actions.setIsLoggedIn(false))
      localStorageSetter('userLogged', 'false');
      dispatch(actions.setErrorState({errorType: 'Authentication error', message: 'User does not exist, please subscribe!'}));
      throw new Error('User does not exists.');
    }
  }, []);

  useEffect(() => { 
    sendRequest(dispatchDataRequest)
  }, [dispatchDataRequest, sendRequest]);

  /**
   * Change selected coffee
   * @param {string} input 
   */
  const coffeeSelectedHandler = (input) => {
  console.log(appState);
    // requestHandler();
    // actions.setSelectedCoffee(value);
  };

  const logInHandler = async (email, password) => {
    requestAuth(email, password, dispatchDataAuth);
    if (errorAuth) dispatch(actions.setErrorState({errorType: 'Authentication error', message: errorAuth.message}))
  };

  const coffeeSelectionHandler = (value) => {
    dispatch(actions.setSelectedCoffee(value))
  };
  
  const preparationsRequest = () => {
    preparationsSetter(dispatchDataPreparations)
    //console.log(errorPreparations);
    // if (errorPreparations) {
    //   dispatch(actions.setErrorState({errorType: 'Preparations error', message: errorPreparations.message}))
    //   return errorPreparations
    // }
  };
  
  const errorSetter = (type, message) => {
    dispatch(actions.setErrorState({errorType: type, message: message}))
  }

  const value = useMemo(() => ({
    state: {
      ...appState,
    },
    dispatch,
    coffeeSelectedHandler,
    coffeeSelectionHandler,
    preparationsRequest,
    logInHandler,
    errorSetter,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [appState]);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
};

AppContextProvider.propTypes = {
  children: PropTypes.node
}
