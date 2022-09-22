import React from 'react';
import PropTypes from 'prop-types';


const Input = (props) => {
  return (
    <div
      className={`${props.classes.control} ${
        props.valid === false ? props.classes.invalid : ''
    }`}
    >
      <label htmlFor={props.inputType}>{props.label}</label>
      <input
        type={props.inputType}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
}

Input.propTypes = {
  classes: PropTypes.object,
  inputType: PropTypes.string,
  label: PropTypes.string,
  valid: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  OnBlur: PropTypes.func
}
export default Input;
