import React from 'react';
import { getImage } from '../assests/coffeeImages/imagesEnums';
import Images from '../components/Expandable/Images';
import classes from './errorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={classes.errorContainer}>
      <Images source={getImage('spilled')}/>
      <h1>Ooooopppsss!</h1>
      <h2>Your coffee got spilled, nothing here</h2> 
    </div>
  );
}

export default ErrorPage;
