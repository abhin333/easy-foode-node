import React from "react";
import './Button.css'
const Button = (props) => {
  const {Login,onClick}=props
  return (
    <div>
        <div className="login-child2">
          <span onClick={onClick}>{Login}</span>
      </div>
    </div>
  );
};

export default Button;
