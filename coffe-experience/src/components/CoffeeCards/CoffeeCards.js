import React from "react";
import Card from "../Card/Card";
import Expandable from "../Expandable/Expandable";
import Search from "../Search/Search";
import './CoffeeCards.css';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import { useStore } from "../../store/app-context";

const CoffeeCards = () => {
  const {state: {coffeeState: {coffeeSelectedData}}} = useStore();
  return (
    <div className='cardContainer'>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={coffeeSelectedData.title}
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
