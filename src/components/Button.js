import React from 'react';

const Button = props => (
  <button
    className={`btn btn-${props.color} btn-lg m-2`}
    disabled={props.disabled}
    onClick={props.handleClick}>
    {props.children}
  </button>
)

export default Button;