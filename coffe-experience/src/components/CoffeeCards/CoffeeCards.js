import Card from "../Card/Card";
import Expandable from "../Expandable/Expandable";
import Search from "../Search/Search";
import './CoffeeCards.css';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import CoffeeContext from "../../store/coffee-context";
import React, {useContext} from "react";
// import ExpandableParagraph from "../Expandable/ExpandableParagraph";

const CoffeeCards = () => {
  const coffeeCxt = useContext(CoffeeContext);
  return (
    <div className='cardContainer'>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={coffeeCxt.coffeeState.coffeeSelected}
          timeout={800}
          classNames='card_animation'
        >
          <Card>
            <Expandable/>
          </Card>
        </CSSTransition>
      </SwitchTransition>
      <Search/>
    </div>
  )
};

export default CoffeeCards;
