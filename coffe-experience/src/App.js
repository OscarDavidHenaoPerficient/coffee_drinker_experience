import React, { useEffect } from 'react';
import Header from './components/Layout/Header';
import CoffeeCards from './components/CoffeeCards/CoffeeCards';
import {AppContextProvider, useStore} from './store/app-context';
import AppContext from './store/index';
import Login from './components/Users/Login';
import {Route, createBrowserRouter, RouterProvider, Routes, Navigate} from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import ErrorPage from './routes/errorPage';
import * as actions from './store/app-actions';
import Welcome from './routes/Welcome';

function App() {
  // const {authState: {isLoggedIn}} = useStore();
  const {authState, dispatch} = useStore();

  useEffect(() => {
   //  console.log('cxt', cxt);
    const loggedIn = localStorage.getItem('userLogged');
    if (loggedIn === 'true') {
      dispatch(actions.setIsLoggedIn(true))
    }
    // console.log('is logged: ', authState);
  }, [])

  return (
    <AppContextProvider>
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate to='/welcome' />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/coffeeStyles' element={<CoffeeCards />} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Layout>
    </AppContextProvider>
  );
}

export default App;
