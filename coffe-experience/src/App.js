import React, {useContext, useEffect} from 'react';
import Header from './components/Layout/Header';
import CoffeeCards from './components/CoffeeCards/CoffeeCards';
import {CoffeeContextProvider} from './store/coffee-context';
import Login from './components/Users/Login';
// import CoffeeContext from './store/coffee-context';
import AuthContext, { AuthContextProvider } from './store/auth-context';

function App() {
  const {isLoggedIn, logInSetter} = useContext(AuthContext);
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('userLogged');
    if (loggedIn === 'true') {
      logInSetter(true)
    }
    console.log('is logged: ', isLoggedIn);
  }, [isLoggedIn, logInSetter])

  return (
    <AuthContextProvider>
      <CoffeeContextProvider>
        <Header></Header>
        <main>
          {/* {!isLoggedIn &&  <Login />} */}
          {isLoggedIn ? <CoffeeCards /> : <Login />}
        </main>
      </CoffeeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
