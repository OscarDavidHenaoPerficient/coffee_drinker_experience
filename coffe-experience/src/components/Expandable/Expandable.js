import React, {useState, Fragment} from "react";
import classes from './Expandable.module.css';
import Images from '../UI/Images';
import { getImage } from "../../assests/coffeeImages/imagesEnums";

const Expandable = (props) => {
  const [openDescription, setOpenDescription] = useState(false);
  const image = props.title.split(' ')[0]

  const closeHandler = () => {
    setOpenDescription(false);
  };

  const openHandler = () => {
    setOpenDescription(true);
  };

  return (
    <Fragment>
      <div className={classes.expandable}>
        <Images source={getImage(image)} alt='coffeeDelight' />
        <div className={classes.expandableTitle}>
          <h1 id='coffee_title'>{props.title}</h1>
          {props.description ? openDescription ? <button onClick={closeHandler}>Close</button> : <button onClick={openHandler}>Details</button> : null}
        </div>
      </div>
      {/* <motion.div layout transition={{layout: {duration: 1}}} className={classes.drawer} > */}
      {openDescription &&  
        (
        // <motion.div className={classes.expandPara} layout transition={{layout: {duration: 1}}}> 
          <p data-testid='description'>{props.description}</p>
        // </motion.div>
        )
      }
      {/* </motion.div> */}
    </Fragment>
  )
};

export default Expandable;
