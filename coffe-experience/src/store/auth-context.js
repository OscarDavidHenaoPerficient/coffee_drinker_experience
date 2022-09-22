import React, {useEffect, useState, useCallback} from "react";
// import PropTypes from 'prop-types';

const AuthContext = React.createContext({
  isLoggedIn: false,
  logInHandler: () => {},
  logInSetter: () => {}
})

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  const authRequest = useCallback( async () => {
    try {
      const response = await fetch('http://localhost:3000/validUsers')
      if (!response.ok) {
        throw new Error('Authentication request failed');
      }
      const data = await response.json();
      // console.log('data: ', data);
      return data
    } catch (error) {
      console.log(error);
    }
  },[]);
  
  useEffect(() => {
    console.log('is Logged In: ', isLoggedIn);
    setTimeout(() => console.log('time out'), 800)
  }, [isLoggedIn]);
  
  const logInHandler = async (email, password) => {
    const authData = await authRequest();
    const existingEmail = authData.find(user => user.username === email);
    if (existingEmail) {
      console.log('user exists');
      if (existingEmail.password === password) {
        console.log('userValid');
        setIsLoggedIn(true);
        localStorage.setItem('userLogged', 'true');
      }
    } else {
      setIsLoggedIn(false);
      localStorage.setItem('userLogged', 'false');
      throw new Error('User does not exist');
    }  
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