import React, {useEffect, useState, useReducer, useContext, useMemo} from "react";
import PropTypes from 'prop-types';
import { authRequest, requestHandler } from "../fetchers/fetchers";

// lines from 5 trough 28 are a file
const coffeeSelectedDataInitialState = {
  id: '0',
  title: 'Busca tu mejor sabor.',
  ingredients: [],
  description: '',
  characteristics: [],
  image: '../assests/coffeeImages/default.png'
};

const selectedCoffee = {
  coffeeData: undefined,
  coffeeSelectedData: coffeeSelectedDataInitialState,
}

const initialState = Object.freeze({
  state: {
    coffeeState: selectedCoffee,
    authState: {
      isLoggedIn: false,
      logInHandler: () => {},
      logInSetter: () => {}
    },
  },
  dispatch: () => { }
});

// lines from 30 trough 56 are a file
const ACTIONS = Object.freeze({
  SET_SELECTED_COFFEE: 'SET_SELECTED_COFFEE',
  SET_COFFE_INITIAL_DATA: 'SET_COFFE_INITIAL_DATA',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_EMAIL: 'SET_EMAIL',
});

const setSelectedCoffee = (payload) => ({
  type: ACTIONS.SET_SELECTED_COFFEE,
  payload
});

const setCoffeeInitialData = (payload) => ({
  type: ACTIONS.SET_COFFE_INITIAL_DATA,
  payload
});

const setPassword= (payload) => ({
  type: ACTIONS.SET_PASSWORD,
  payload
});

const setEmail= (payload) => ({
  type: ACTIONS.SET_EMAIL,
  payload
});

// lines from 57 trough 61 are a file
const AppContext = React.createContext({
  state: undefined,
  dispatch: undefined
});

export const useStore = () => useContext(AppContext);

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SELECTED_COFFEE:
      return {
        ...state,
        coffeeSelectedData: state.coffeeData.find(coffee => coffee.title === action.payload)
      }
    case ACTIONS.SET_COFFE_INITIAL_DATA:
      return {
        ...state,
        coffeeData: payload
      }
    case ACTIONS.SET_PASSWORD:
      return {
        ...state,
        // todo
      }
    case ACTIONS.SET_EMAIL:
      return {
        ...state,
        // todo
      }
    default:
      throw new Error('Action not supported')
  }
}

export const CoffeeContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, initialState)
  
  // const [token, setToken] = useState()

  // const requestHandler = useCallback(async () => {
  //   if (!coffeeData) {
  //     try {
  //       const response = await fetch('http://localhost:3000/coffee_types');
  //       if (!response.ok) {
  //         throw new Error('Something went wrong!');
  //       }
  //       const data = await response.json();
  //       setCoffeeData(data)
  //       dispatchCoffee({type: 'COFFEE_DATA', value: data})
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [coffeeData]);

  // const authRequest = useCallback( async (email, password) => {
  //   try {
  //     const response = await fetch('http://localhost:3000/validUsers')
  //     if (!response.ok) {
  //       throw new Error('Authentication request failed');
  //     }
  //     const data = await response.json();
  //     const existingEmail = data.find(user => user.username === email);
  //     if (existingEmail) {
  //       console.log('user exists', existingEmail);
  //       if (existingEmail.password === password) {
  //         console.log('userValid');
  //         setIsLoggedIn(true);
  //         // setToken(existingEmail.token)
  //         localStorage.setItem('token', existingEmail.token)
  //         localStorage.setItem('userLogged', 'true');
  //       } else {
  //         setIsLoggedIn(false);
  //         localStorage.setItem('userLogged', 'false');
  //         throw new Error('Wrong password');
  
  //       }
  //     } else {
  //       setIsLoggedIn(false);
  //       localStorage.setItem('userLogged', 'false');
  //       throw new Error('User does not exist');
  //     }
  //     // console.log('data: ', data);
  //     return await data
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },[]);

  useEffect(() => {
    requestHandler();
  }, []);

  /**
   * Change selected coffee
   * @param {string} input 
   */
  const coffeeSelectedHandler = (input) => {
    dispatch(setSelectedCoffee(input));
  };

  // todo
  const logInHandler =  (email, password) => {
    authRequest(email, password);
  };

  const logInSetter = (value) => {
    setIsLoggedIn(value);
  };

  const value = useMemo(() => ({
    state: {
      ...appState,
    },
    dispatch,
    coffeeSelectionHandler,
    logInHandler,
    logInSetter,
    coffeeSelectedHandler
  }), [appState]);

  return (
    <CoffeeContext.Provider value={value}>
      {props.children}
    </CoffeeContext.Provider>
  )
};

CoffeeContextProvider.propTypes = {
  children: PropTypes.node
}

export default CoffeeContext;
