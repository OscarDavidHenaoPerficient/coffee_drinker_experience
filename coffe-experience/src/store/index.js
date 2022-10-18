import React from "react";

const AppContext = React.createContext({
  authState: {
    isLoggedIn: undefined,
    email: undefined,
    password: undefined
  },
  coffeeState: {
    coffeeData: undefined,
    coffeeSelectedData: undefined
  },
  preparations: undefined,
  errorState: {
    errorType: undefined,
    message: undefined
  },
  dispatch: () => {},
  coffeeSelectedHandler: () => {},
  coffeeSelectionHandler: () => {},
  preparationsRequest: () => {},
  logInHandler: () => {},
});

export default AppContext;
