import { Link } from "react-router-dom";
import React, { Component } from "react";
import "../css/navbar.css";
import { VERSION_NUMBER } from "../App";

class FooterMain extends Component {
  state = {
    version: 1,
  };

  render() {
    return <footer>SigmaBank Version {VERSION_NUMBER}</footer>;
  }
}

export default FooterMain;
