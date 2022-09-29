import React, {useEffect, useReducer, useContext, useMemo, useCallback} from "react";
import PropTypes from 'prop-types';
import { useFetch, useAuth } from "../fetchers/fetchers";
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
  
  const dispatchDataRequest = useCallback((data) => {
    if (error) {
      dispatch(actions.setErrorState({type: 'Error at fetching', message: error.message})) 
      dispatch(actions.setCoffeeInitialData({}))
    } else if (data) {
      dispatch(actions.setCoffeeInitialData(data))
    } 
  }, [error]);

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

  const value = useMemo(() => ({
    state: {
      ...appState,
    },
    dispatch,
    coffeeSelectedHandler,
    coffeeSelectionHandler,
    logInHandler
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
