import React, {useState, Fragment} from "react";
import classes from './Expandable.module.css';
import AppContext from '../../store/index';
import {useStore} from '../../store/app-context';
import Images from './Images';
import { getImage } from "../../assests/coffeeImages/imagesEnums";
import {motion} from 'framer-motion';

const Expandable = () => {
  const [openDescription, setOpenDescription] = useState(false);
  const {state: {coffeeState: {coffeeSelectedData}}} = useStore(AppContext);

  const closeHandler = () => {
    setOpenDescription(false);
  };
  
  const openHandler = () => {
    setOpenDescription(true);
  };

  return (
    <Fragment>
      <div className={classes.expandable}>
        <Images source={getImage(coffeeSelectedData.title)} alt='coffeeDelight' />
        <div className={classes.expandableTitle}>
          <h1>{coffeeSelectedData.title}</h1>
          {coffeeSelectedData.description ? openDescription ? <button onClick={closeHandler}>Close</button> : <button onClick={openHandler}>Details</button> : null}
        </div>
      </div>
      <motion.div layout transition={{layout: {duration: 1}}} className={classes.drawer} >
      {openDescription &&  
        (<motion.div className={classes.expandPara} layout transition={{layout: {duration: 1}}}> 
          <p data-testid='description'>{coffeeSelectedData.description}</p>
        </motion.div>
        )
      }
      </motion.div>
    </Fragment>
  )
};

export default Expandable;
