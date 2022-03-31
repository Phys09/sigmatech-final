/**
 * This file is responsible for the main 'HomePage' components.
 * Links to other parts of the site, etc...
 */
import React from "react";
import "./css/App.css";
import "./css/HomePage.css";
import { Link } from "react-router-dom";

import Navbar from "./components/navbar";
import FooterMain from "./components/footer";
const VERSION_NUMBER = "1.0.0";


export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar page="Home"/>
        <div className="HomePageMatter">
          <h1 className="Description">Your Next Bank is Here!</h1>
          <Link className="Signup" to="/signup">
            Signup
          </Link>
        </div>
        <FooterMain />
      </div>
    );
  }
}

// to be used in footer component; shoule be replaced with context later
export { VERSION_NUMBER };
