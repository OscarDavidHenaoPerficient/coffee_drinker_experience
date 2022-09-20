import Card from "../Card/Card";
import Expandable from "../Expandable/Expandable";
import Search from "../Search/Search";
import classes from './CoffeeCards.module.css';
// import {SwitchTransition, CSSTransition} from 'react-transition-group';
import CoffeeContext from "../../store/coffee-context";
import React, {useContext, useState} from "react";

const CoffeeCards = () => {
  const [state, setState] = useState(false);
  const nodeRef = React.useRef();
  const cxt = useContext(CoffeeContext);

  return (
    <div className={classes.cardContainer}>
      {/* <SwitchTransition mode='out-in'>
        <CSSTransition
          key={cxt.coffeeSelected}
          nodeRef={nodeRef}
          addEndListener={(done) => {
            nodeRef.current.addEventListener('transitionend', done, false);
          }}
          classNames='fade'
        > */}
          <Card>
            <Expandable/>
          </Card>
        {/* </CSSTransition>
      </SwitchTransition> */}
      <Search/>
    </div>
  )
};

export default CoffeeCards;