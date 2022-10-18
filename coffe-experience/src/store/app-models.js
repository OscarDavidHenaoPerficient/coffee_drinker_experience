const coffeeSelectedDataInitialState = {
  id: '0',
  title: 'Busca tu mejor sabor.',
  ingredients: [],
  description: '',
  characteristics: [],
  image: '../assests/coffeeImages/default.png'
};

const selectedCoffee = {
  coffeeData: undefined,
  coffeeSelectedData: coffeeSelectedDataInitialState
}

const authenticationInitialState = {
  isLoggedIn: false,
  email: undefined,
  password:undefined
};

const errorState = {
  errorType: undefined,
  message: undefined
}

const initialState = Object.freeze(
  {
    coffeeState: selectedCoffee,
    authState: authenticationInitialState,
    preparations: [],
    errorState: errorState,
    dispatch: () => {}
});

export default initialState;