import React, { Component } from "react";
//import { Link } from "react-router-dom";

import logo from '../../logo.png'; 

console.log(logo);

class Header extends Component {
  render(){
    return (  
      <img className="responsive-img" style={{maxWidth: '45%'}} src={logo} alt="Logo"/>
    );
  }
}


export default Header;
