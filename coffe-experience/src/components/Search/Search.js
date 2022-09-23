import React, {useContext} from "react";
import classes from './Search.module.css';
import CoffeeContext from '../../store/coffee-context';

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
    cxt.coffeeState.coffeeSelectionHandler(event.target.value);
    console.log(cxt.coffeeState.coffeeSelectedData);
  }

  return (
    <div className={classes.control}>
      <label>Escoge tu café favorito: </label>
      <select data-testid='selection_drawer' onChange={onClickhandler}  >
        {coffeeList.map((item) => <option  data-testid={item} key={item} value={item}>{item}</option>)}
      </select>
    </div>
  )
}

export default Search;
