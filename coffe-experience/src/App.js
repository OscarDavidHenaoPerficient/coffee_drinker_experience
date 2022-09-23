import React, {useContext, useEffect, useState} from 'react';
import Header from './components/Layout/Header';
import CoffeeCards from './components/CoffeeCards/CoffeeCards';
import CoffeeContext, {CoffeeContextProvider} from './store/coffee-context';
import Login from './components/Users/Login';
// import CoffeeContext from './store/coffee-context';
// import AuthContext, { AuthContextProvider } from './store/auth-context';

function App() {
  // const {isLoggedIn} = useContext(CoffeeContext);
  const cxt = useContext(CoffeeContext);
  
  const [logIn, setLogIn] = useState(false);

  console.log('is looged in app', cxt.authState.isLoggedIn);
  useEffect(() => {
    console.log(cxt.authState.isLoggedIn);
    // setLogIn(true)
    const loggedIn = localStorage.getItem('userLogged');
    if (loggedIn === 'true') {
      cxt.authState.logInSetter(true)
      setLogIn(true)
    }
    console.log('is logged: ', cxt.authState.isLoggedIn);
  }, [cxt.authState])

  return (
    <CoffeeContextProvider>
      <Header></Header>
      <main>
        <p>{cxt.authState.isLoggedIn}</p>
        {/* {!isLoggedIn &&  <Login />} */}
        {/* {!logIn && <CoffeeCards />} */}
        {!logIn && <Login />}
        {/* <CoffeeCards /> */}
      </main>
    </CoffeeContextProvider>
  );
}

export default App;
