import * as actions from './app-actions';

const appReducer = (state, action) => {
  switch (action.type) {
    case actions.ACTIONS.SET_SELECTED_COFFEE:
      return {
        ...state, 
        coffeeState: { 
          coffeeSelectedData: state.coffeeData.find(coffee => coffee.title === action.payload)
        }
      }
    case actions.ACTIONS.SET_COFFEE_INITIAL_DATA: 
      return {
        ...state,
        coffeeData: action.payload,
      }
    case actions.ACTIONS.SET_EMAIL: 
      return {
        ...state,
        authState: {
          email: action.payload
        },
        coffeeData: state.coffeeData
      }
    case actions.ACTIONS.SET_PASSWORD:
      return {
        ...state,
        authState: {
          email: state.authState.email,
          password: action.payload
        },
        coffeeData: state.coffeeData
      }
    case actions.ACTIONS.SET_IS_LOGGED_IN:
      return {
        ...state,
        authState: {
          email: state.authState.email,
          password: state.authState.password,
          isLoggedIn: action.payload
        },
      }
    case actions.ACTIONS.SET_ERROR:
      return {
        ...state,
        errorState: {
          errorType: action.payload.errorType,
          message: action.payload.message
        }
      }
    default:
      return;
  }
}

export default appReducer;
