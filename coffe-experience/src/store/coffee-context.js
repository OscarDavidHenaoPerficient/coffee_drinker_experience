import React, {useEffect, useState, useReducer} from "react";
import PropTypes from 'prop-types';
import { authRequest, requestHandler } from "../fetchers/fetchers";

const initialState = {
  id: '0',
  title: 'Busca tu mejor sabor.',
  ingredients: [],
  description: '',
  characteristics: [],
  image: '../assests/coffeeImages/default.png'
};

const CoffeeContext = React.createContext({
  coffeeState: {
    coffeeSelected: 'default',
    allCoffeeData: [],
    coffeeSelectedData: initialState,
    coffeeSelectionHandler: () => {}
  },
  authState: {
    isLoggedIn: false,
    logInHandler: () => {},
    logInSetter: () => {}
  }
});

const coffeeReducer = (state, action) => {
  switch (action.type) {
    case 'ALL_COFFEE_DATA':
      return {allCoffeeData: action.value}
    default:
      return;
  }
}

const reducerCoffeeInitialState = {
  coffeeSelected: '',
  coffeeData: undefined,
  coffeeSelectedData: initialState,
}

export const CoffeeContextProvider = (props) => {
  const [coffeeStateReducer, dispatchCoffee] = useReducer(coffeeReducer, reducerCoffeeInitialState)
  
  const [coffeeSelected, setCoffeeSelected] = useState('');
  const [coffeeData, setCoffeeData] = useState(undefined);
  const [coffeeSelectedData, setCoffeeSelectedData] = useState(initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const coffeeSelectedHandler = (value) => {
    // requestHandler();
    setCoffeeSelected(value);
    const dataSet = coffeeData.find((element) => element.title === value )
    console.log(dataSet);
    if (dataSet) {
      setCoffeeSelectedData(dataSet);
    } else {
      setCoffeeSelectedData(initialState)
    }
  };

  const logInHandler =  (email, password) => {
    authRequest(email, password);
  };

  const logInSetter = (value) => {
    setIsLoggedIn(value);
  };

  return (
    <CoffeeContext.Provider value={{
      coffeeState: {
        coffeeSelected: coffeeSelected,
        allCoffeeData: coffeeData,
        coffeeSelectedData: coffeeSelectedData,
        coffeeSelectionHandler: coffeeSelectedHandler
      },
      authContext: {
        isLoggedIn: isLoggedIn,
        logInHandler: logInHandler,
        logInSetter: logInSetter
      }
    }}>
      {props.children}
    </CoffeeContext.Provider>
  )
};

CoffeeContextProvider.propTypes = {
  children: PropTypes.node
}

export default CoffeeContext;
