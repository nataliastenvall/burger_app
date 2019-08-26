import React from 'react';
import burgerLogo from '../../Assets/Images/burger-logo.png';
import classes from './Logo.css';

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="myBurger" />
  </div>
);

export default Logo;
