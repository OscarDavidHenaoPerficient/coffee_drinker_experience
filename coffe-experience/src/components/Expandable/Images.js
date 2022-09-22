import React from "react";

const Images = (props) => {
  return (
    <div>
      <img src={props.source} alt={props.alt} ></img>
    </div>
  )
};

export default Images;