import React, { useEffect } from 'react';
import Header from './components/Layout/Header';
import CoffeeCards from './components/CoffeeCards/CoffeeCards';
import {AppContextProvider, useStore} from './store/app-context';
import AppContext from './store/index';
import Login from './components/Users/Login';
import { setIsLoggedIn } from './store/app-actions';
import {Route, createBrowserRouter, RouterProvider, Routes, Navigate} from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import ErrorPage from './routes/errorPage';
import Welcome from './routes/Welcome';

// const router = createBrowserRouter([
  
// ]);

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
      <Layout>
          {/* <Login />
          <CoffeeCards /> */}
        <Routes>
          <Route path='/' element={<Navigate to='/welcome' />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/coffeeStyles' element={<CoffeeCards />} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
        {/* TODO: build a HOC here */}
        
        {/* {isLoggedIn &&  } */}
        {/* {!isLoggedIn && } */}
      </Layout>
    </AppContextProvider>
  );
}

export default App;
