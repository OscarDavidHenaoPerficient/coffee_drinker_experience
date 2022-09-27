import React, {Fragment} from 'react';
import coffeBeans from '../../assests/coffeeImages/coffeeBeans.jpeg';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Button from '../Users/Button';
import { useStore } from '../../store/app-context';

const Header = () => {
  const {state: {authState}} = useStore();
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Coffee Styles</h1>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to='/coffeeStyles' className={navData => navData.isActive ? classes.active : ''}>Coffee Styles</NavLink>
            </li>
            <li>
              <NavLink to='/preparations' className={navData => navData.isActive ? classes.active : ''}>Preparations</NavLink>
            </li>
            <li>
              <NavLink to='shop'className={navData => navData.isActive ? classes.active : ''}>Shop</NavLink>
            </li>
            
          </ul>
          
        </nav>
        {authState &&
              
              <Button >
                <NavLink to='/login'className={navData => navData.isActive ? classes.active : ''}>Log In</NavLink>
              </Button>
          }
      </header>
      <div className={classes['main-image']}>
        <img data-testid='coffeeBeans' src={coffeBeans} alt="coffee Beans" />
      </div>
    </Fragment>
  );
}

export default Header;
