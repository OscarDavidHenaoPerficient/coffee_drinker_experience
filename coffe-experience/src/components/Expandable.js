import React, {useState, useContext} from "react";
import classes from './Expandable.module.css';
import CoffeeContext from "../store/coffee-context";
import { getImage } from "../assests/coffeeImages/imagesEnums";

const Expandable = () => {
  const [openDescription, setOpenDescription] = useState(false);
  const cxt = useContext(CoffeeContext);

  const closeHandler = () => {
    setOpenDescription(false)
  };
  
  const openHandler = () => {
    setOpenDescription(true)
  };

  return (
    <div className={classes.expandable}>
      <img src={getImage(cxt.coffeeSelected)} alt='coffee delight'></img>
      <div className={classes.expandableTitle}>
        <h1>{cxt.coffeeSelectedData.title}</h1>
        {cxt.coffeeSelected ? openDescription ? <button onClick={closeHandler}>Close</button> : <button onClick={openHandler}>Details</button> : null}
      </div>
      {openDescription &&  <p>{cxt.coffeeSelectedData.description}</p>}
    </div>
  )
};

export default Expandable;
