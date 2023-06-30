import React from 'react';
import logo from '../src/media/PAMLOGO.png';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="React logo" />
    </div>
  );
};

export default Header;