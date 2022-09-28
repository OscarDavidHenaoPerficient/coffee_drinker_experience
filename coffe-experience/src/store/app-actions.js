export const ACTIONS = Object.freeze({
  SET_SELECTED_COFFEE: 'SET_SELECTED_COFFEE',
  SET_COFFEE_INITIAL_DATA: 'SET_COFFEE_INITIAL_DATA',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_EMAIL: 'SET_EMAIL',
  SET_IS_LOGGED_IN: 'SET_IS_LOGGED_IN',
  SET_ERROR: 'SET_ERROR'
})

export const setSelectedCoffee = (payload) => ({
  type: ACTIONS.SET_SELECTED_COFFEE,
  payload
});

export const setCoffeeInitialData = (payload) => ({
  type: ACTIONS.SET_COFFEE_INITIAL_DATA,
  payload
});

export const setPassword = (payload) => ({
  type: ACTIONS.SET_PASSWORD,
  payload
});

export const setEmail = (payload) => ({
  type: ACTIONS.SET_EMAIL,
  payload
});

export const setIsLoggedIn = (payload) => ({
  type: ACTIONS.SET_IS_LOGGED_IN,
  payload
});

export const setErrorState = (payload) => ({
  type: ACTIONS.SET_ERROR,
  payload
});
