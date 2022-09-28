import * as actions from '../store/app-actions';

export const requestHandler = async (dispacth) => {

  try {
    const response = await fetch('http://localhost:3000/coffee_types');
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const data = await response.json();
    dispacth(actions.setCoffeeInitialData(data))
  } catch (error) {
    console.log(error);
    
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
        localStorage.setItem('token', existingEmail.token)
        localStorage.setItem('userLogged', 'true');
      } else {
        dispatch(actions.setIsLoggedIn(false));
        localStorage.setItem('userLogged', 'false');
        // actions.setIsLoggedIn(false)
        throw new Error('Wrong password');
        // actions.setErrorState('Wrong password', 'wrong password')
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
