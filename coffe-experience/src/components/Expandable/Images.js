import React from "react";
import classes from './Images.module.css';

const Images = (props) => {
  return (
    <div className={classes.image}>
      <img src={props.source} alt={props.alt} ></img>
    </div>
  )
};

export default Images;