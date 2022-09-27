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
  dispatch: () => {},
  coffeeSelectedHandler: () => {},
  coffeeSelectionHandler: () => {},
  logInHandler: () => {},
});

export default AppContext;