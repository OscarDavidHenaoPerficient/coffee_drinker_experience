import React, {Fragment} from 'react';
import coffeBeans from '../../assests/coffeeBeans.jpeg';
import classes from './Header.module.css';

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Coffee Styles</h1>
      </header>
      <div className={classes['main-image']}>
        <img src={coffeBeans} alt="coffee Beans" />
      </div>
    </Fragment>
  );
}

export default Header;
