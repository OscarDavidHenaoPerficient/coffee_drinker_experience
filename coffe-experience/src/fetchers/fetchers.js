import {useState, useCallback, useEffect} from 'react';
import * as actions from '../store/app-actions';
import {useStore} from '../store/app-context';
// import AppContext from '../store';

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/coffee_types');
      if (!response.ok) throw new Error('Something went wrong!');
      const data = await response.json();
      applyData(data)
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }, []);

  return {
    isLoading,
    sendRequest,
    error
  }
};

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestAuth = useCallback(async (email, password, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/validUsers');
      if (!response.ok) {
        throw new Error('Authentication error');
      }
      const data = await response.json();
      applyData(data, email, password);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [])
  return {requestAuth, error, isLoading}
}

export const useRequest = () => {
  const {dispatch} = useStore();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {(async function () {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/coffee_types');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      dispatch(actions.setCoffeeInitialData(data))
    } catch (error) {
      dispatch(actions.setErrorState({errorType: 'Error in page', message: error.message}))
    }
    setIsLoading(false);
  })()
  }, []);
  return {
    isLoading,
  }
}

export const usePreparations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorPreparations, setErrorPreparations] = useState(null)
  
  const preparationsSetter = useCallback(async (dispatchDataPreparations) => {
    setIsLoading(true);
    setErrorPreparations(null)
    try {
      const response = await fetch('http://localhost:3000/preparations');
      if (!response.ok) {
        throw new Error('Something went wrong at preparations');
      }
      const data = await response.json();
      dispatchDataPreparations(data)
    } catch (error) {
      setErrorPreparations(error)
    }
    setIsLoading(false)
  }, [])
  return {preparationsSetter, isLoading, errorPreparations}
}

// old fetchers
export const requestHandler = async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/coffee_types');
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const data = await response.json();
    dispatch(actions.setCoffeeInitialData(data))
  } catch (error) {
    console.log(error);
    dispatch(actions.setErrorState({errorType: 'Error in page', message: error.message}))
  }
};

export const authRequest = async (email, password, dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/validUsers')
    if (!response.ok) {
      throw new Error('Authentication request failed');
    }
    const data = await response.json();
    
    const existingEmail = data.find(user => user.username === email);
    if (existingEmail) {
      if (existingEmail.password === password) {
        dispatch(actions.setIsLoggedIn(true));
        localStorage.setItem('token', existingEmail.token);
        localStorage.setItem('userLogged', 'true');
      } else {
        dispatch(actions.setIsLoggedIn(false));
        localStorage.setItem('userLogged', 'false');
        throw new Error('Wrong password');
      }
    } else {
      dispatch(actions.setIsLoggedIn(false));
      localStorage.setItem('userLogged', 'false');
      throw new Error('User does not exist');
    }
    return await data
  } catch (error) {
    console.log(error.message);
    dispatch(actions.setErrorState({ errorType: 'authentication error', message: error.message}));
  }
};
