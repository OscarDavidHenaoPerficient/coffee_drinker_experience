import React, {Fragment} from 'react';
import coffeBeans from '../../assests/coffeeImages/coffeeBeans.jpeg';
import classes from './Header.module.css';

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Coffee Styles</h1>
      </header>
      <div className={classes['main-image']}>
        <img data-testid='coffeeBeans' src={coffeBeans} alt="coffee Beans" />
      </div>
    </Fragment>
  );
}

export default Header;
