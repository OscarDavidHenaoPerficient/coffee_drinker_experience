import React, { useEffect } from 'react';
import Header from './components/Layout/Header';
import CoffeeCards from './components/CoffeeCards/CoffeeCards';
import {AppContextProvider, useStore} from './store/app-context';
import AppContext from './store/index';
import Login from './components/Users/Login';
import { setIsLoggedIn } from './store/app-actions';

function App() {
  const {authState: {isLoggedIn}} = useStore(AppContext);

  useEffect(() => {
    console.log(isLoggedIn);
    const loggedIn = localStorage.getItem('userLogged');
    if (loggedIn === 'true') {
      setIsLoggedIn(true)
    }
    console.log('is logged: ', isLoggedIn);
  }, [isLoggedIn])

  return (
    <AppContextProvider>
      <Header></Header>
      <main>
        {/* TODO: build a HOC here */}
        {isLoggedIn &&  <Login />}
        {!isLoggedIn && <CoffeeCards />}
      </main>
    </AppContextProvider>
  );
}

export default App;
