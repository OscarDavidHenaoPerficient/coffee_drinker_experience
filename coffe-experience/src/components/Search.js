import React, {useContext} from "react";
import classes from './Search.module.css';
import CoffeeContext from '../store/coffee-context';

const Search = () => {
  const coffeeList = [
    'Seleccione una opción',
    'Espresso',
    'Vienes',
    'Americano',
    'Cappuccino',
    'Latte',
    'Mocha',
    'Macchiato',
    'Carajillo',
    'Lungo',
    'Frappé',
    'Irlandes',
    'Cold Brew',
    'Ristretto',
    'Flat White'
  ];
  const cxt = useContext(CoffeeContext);  

  const onClickhandler = (event) => {
    cxt.coffeeSelectionHandler(event.target.value);
  }

  return (
    <div className={classes.control}>
      <label>Escoge tu café favorito: </label>
      <select onChange={onClickhandler}  >
        {coffeeList.map((item) => <option  key={item} value={item}>{item}</option>)}
      </select>
    </div>
  )
}

export default Search;
