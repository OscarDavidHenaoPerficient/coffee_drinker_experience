import React from 'react';
import classes from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={classes.container}>
      <div id='welcome_container' className={classes.welcome}>
        <p id='welcome_message'>hello welcome to coffee Styles</p>
      </div>
    </div>
  );
}

export default Welcome;
