import React from "react";
import Card from "../../components/Card/Card";
import Expandable from "../../components/Expandable/Expandable";
import Search from "../../components/Search/Search";
import './CoffeeCards.css';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import { useStore } from "../../store/app-context";
import Loading from "../../components/UI/Loading";

const CoffeeCards = (props) => {
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
            {props.isLoading ? <Loading /> : 
              <Expandable title={coffeeSelectedData.title} description={coffeeSelectedData.description} />
            }
          </Card>
        </CSSTransition>
      </SwitchTransition>
      <Search/>
    </div>
  )
};

export default CoffeeCards;
