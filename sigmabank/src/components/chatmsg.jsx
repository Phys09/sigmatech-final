import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

class Square extends Component {
  state = {
    version: 1,
  };

  render() {
    return (
        <button className="square" >
          {this.props.value}  
        </button> 
        // setstate: 初始没有state (空白)
        // set以后变为 X, 显示出state
    );
  }
}

export default Square;