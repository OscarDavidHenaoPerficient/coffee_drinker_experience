import React, { useEffect } from 'react';
import CoffeeCards from './containers/CoffeeCards/CoffeeCards';
import {AppContextProvider, useStore} from './store/app-context';
import Login from './containers/Login';
import {Route, Routes, Navigate} from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import ErrorPage from './routes/errorPage';
import * as actions from './store/app-actions';
import Welcome from './routes/Welcome';
import {useFetch} from './fetchers/fetchers';

function App() {
  const { dispatch} = useStore();
  const {isLoading} = useFetch();

  useEffect(() => {
    const loggedIn = localStorage.getItem('userLogged');
    if (loggedIn === 'true') {
      dispatch(actions.setIsLoggedIn(true))
    }
  }, [dispatch]);

  return (
    <AppContextProvider>
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate replace to='/welcome' />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/coffeeStyles' element={<CoffeeCards loading={isLoading}/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Layout>
    </AppContextProvider>
  );
}

export default App;
