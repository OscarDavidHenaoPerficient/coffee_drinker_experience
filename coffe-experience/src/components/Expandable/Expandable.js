import React, {useState, useContext, Fragment} from "react";
import classes from './Expandable.module.css';
import CoffeeContext from "../../store/coffee-context";
import Images from './Images';
import { getImage } from "../../assests/coffeeImages/imagesEnums";
import {motion} from 'framer-motion';

const Expandable = () => {
  const [openDescription, setOpenDescription] = useState(false);
  const cxt = useContext(CoffeeContext);

  const closeHandler = () => {
    setOpenDescription(false)
    // cxt.openDescriptionHandler(false)
  };
  
  const openHandler = () => {
    setOpenDescription(true)
    // cxt.openDescriptionHandler(true)
    
  };

  return (
    <Fragment>
      <div className={classes.expandable}>
        <Images source={getImage(cxt.coffeeState.coffeeSelected)} alt='coffeeDelight' />
        <div className={classes.expandableTitle}>
          <h1>{cxt.coffeeState.coffeeSelectedData.title}</h1>
          {cxt.coffeeState.coffeeSelected ? openDescription ? <button onClick={closeHandler}>Close</button> : <button onClick={openHandler}>Details</button> : null}
        </div>
      </div>
      <motion.div layout transition={{layout: {duration: 1}}} className={classes.drawer} >
      {openDescription &&  
        (<motion.div className={classes.expandPara} layout transition={{layout: {duration: 1}}}> 
          <p data-testid='description'>{cxt.coffeeState.coffeeSelectedData.description}</p>
        </motion.div>
        )}
      </motion.div>
    </Fragment>
  )
};

export default Expandable;
