import React, {useCallback, useContext} from 'react';
// import axios from 'axios';
import CoffeeContext from '../store/coffee-context';
import setCoffeeData from '../store/contextMethods';

export const requestHandler = (coffeeData) => {
  return () => useCallback(async () => {
    if (!coffeeData) {
      try {
        const response = await fetch('http://localhost:3000/coffee_types');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setCoffeeData(data)
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
}
  
export const authRequest = () => {
  return () => useCallback( async (email, password) => {
    const cxt = useContext(CoffeeContext)
    try {
      const response = await fetch('http://localhost:3000/validUsers')
      if (!response.ok) {
        throw new Error('Authentication request failed');
      }
      const data = await response.json();
      const existingEmail = data.find(user => user.username === email);
      if (existingEmail) {
        console.log('user exists', existingEmail);
        if (existingEmail.password === password) {
          console.log('userValid');
          cxt.authState.setIsLoggedIn(true);
          // setToken(existingEmail.token)
          localStorage.setItem('token', existingEmail.token)
          localStorage.setItem('userLogged', 'true');
        } else {
          cxt.authState.setIsLoggedIn(false);
          localStorage.setItem('userLogged', 'false');
          throw new Error('Wrong password');
  
        }
      } else {
        cxt.authState.setIsLoggedIn(false);
        localStorage.setItem('userLogged', 'false');
        throw new Error('User does not exist');
      }
      // console.log('data: ', data);
      return await data
    } catch (error) {
      console.log(error);
    }
},[]);
};


// export const fetchDataCoffee = () => {
  //   return async () => {
  //     const fetchData = async () => {
  //       const response = await fetch('http://localhost:3000/coffee_types');
  //       if (!response.ok) {
  //         throw new Error('data fetch failed')
  //       }
  //       const data = await response.json();
  //       return data
  //     }
  //     try {
  //       const dataCoffee = await fetchData()
  //       return dataCoffee
  //     } catch (error) {
  //       console.log(error);
  //     } 
  //   }
  // };
  
  // export const fetchDataSecond = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/coffee_types');
  //     if (!response.ok) {
  //       throw new Error('fetching failed');
  //     }
  //     const data =  response.json();
  //     return data
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  // export const getCoffeeList = async () => {
  //   try {
  //     const response = await axios('http://localhost:3000/coffee_types')
  //     return response.data;
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   // let responseData
    
  //   // .then(function (response) {
  //   //     console.log('in fetchers', response.data);
  //   //     responseData = response.data;
  //   //     // return JSON.stringify(response.data)
  //   //     return Promise.resolve(responseData)
  //   //   }).catch((error) => {
  //   //     console.log(error);
  //   //     responseData = error;
  //   //   });
  //   // return new Promise((resolve, reject) => responseData)
  //}:
