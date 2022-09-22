import React, {useEffect, useState, useCallback} from "react";
import PropTypes from 'prop-types';

const initialState = {
  id: '0',
  title: 'Busca tu mejor sabor.',
  ingredients: [],
  description: '',
  characteristics: [],
  image: '../assests/coffeeImages/default.png'
};

const CoffeeContext = React.createContext({
  coffeeSelected: 'default',
  allCoffeeData: [],
  coffeeSelectedData: initialState,
  coffeeSelectionHandler: () => {}
});

export const CoffeeContextProvider = (props) => {
  const [coffeeSelected, setCoffeeSelected] = useState('');
  const [coffeeData, setCoffeeData] = useState(undefined);
  const [coffeeSelectedData, setCoffeeSelectedData] = useState(initialState);

  const requestHandler = useCallback(async () => {
    if (!coffeeData) {
      try {
        const response = await fetch('http://localhost:3000/coffee_types');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setCoffeeData(data)
      } catch (error) {
        console.log(error);
      }
    }
  }, [coffeeData]);

  useEffect(() => {
    requestHandler();
  }, [requestHandler]);

  const coffeeSelectedHandler = (value) => {
    // requestHandler();
    setCoffeeSelected(value);
    const dataSet = coffeeData.find((element) => element.title === value )
    console.log(dataSet);
    if (dataSet) {
      setCoffeeSelectedData(dataSet);
    } else {
      setCoffeeSelectedData(initialState)
    }
  };

  return (
    <CoffeeContext.Provider value={{
      coffeeSelected: coffeeSelected,
      allCoffeeData: coffeeData,
      coffeeSelectedData: coffeeSelectedData,
      coffeeSelectionHandler: coffeeSelectedHandler
    }}>
      {props.children}
    </CoffeeContext.Provider>
  )
};

CoffeeContextProvider.propTypes = {
  children: PropTypes.node
}

export default CoffeeContext;
