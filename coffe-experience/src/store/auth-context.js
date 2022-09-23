import React, {useEffect, useState, useCallback} from "react";
// import PropTypes from 'prop-types';

const AuthContext = React.createContext({
  isLoggedIn: false,
  logInHandler: () => {},
  logInSetter: () => {}
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState()
  
  const authRequest = useCallback( async (email, password) => {
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
          setIsLoggedIn(true);
          setToken(existingEmail.token)
          localStorage.setItem('token', existingEmail.token)
          localStorage.setItem('userLogged', 'true');
        } else {
          setIsLoggedIn(false);
          localStorage.setItem('userLogged', 'false');
          throw new Error('Wrong password');
  
        }
      } else {
        setIsLoggedIn(false);
        localStorage.setItem('userLogged', 'false');
        throw new Error('User does not exist');
      }
      // console.log('data: ', data);
      return await data
    } catch (error) {
      console.log(error);
    }
  },[]);
  
  useEffect(() => {
    console.log('is Logged In: ', isLoggedIn);
    setTimeout(() => console.log('time out'), 800)
  }, [isLoggedIn]);
  
  const logInHandler =  (email, password) => {
    authRequest(email, password);
  };

  const logInSetter = (value) => {
    setIsLoggedIn(value);
  };
  
  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      logInHandler: logInHandler,
      logInSetter: logInSetter
    }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContext; 