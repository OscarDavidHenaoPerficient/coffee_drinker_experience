import React, {useEffect, useReducer, useContext, useMemo} from "react";
import PropTypes from 'prop-types';
import { authRequest, requestHandler } from "../fetchers/fetchers";
import initialState from './app-models';
import AppContext from './index'
import * as actions from './app-actions';
import appReducer from "./app-reducer";

export const useStore = () => useContext(AppContext);

export const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    requestHandler(dispatch);
  }, []);

  /**
   * Change selected coffee
   * @param {string} input 
   */
  const coffeeSelectedHandler = (input) => {
  console.log(appState);
    // requestHandler();
    // actions.setSelectedCoffee(value);
  };

  const logInHandler =  (email, password) => {
    // console.log('in log in handler: ', email );
    authRequest(email, password, dispatch);
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
