/**
 * This file is responsible for the main 'HomePage' components.
 * Links to other parts of the site, etc...
 */
import React from "react";
import "./css/App.css";
import { Link } from "react-router-dom";

const VERSION_NUMBER = "0.1.1";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="Logo">ΣBank | Home</header>
        <h1>Your Next Bank is Here!</h1>
        <nav>
          <Link to="/">Homepage</Link>
          <Link className="Signup" to="/CreateAccountForm">Signup</Link>
          <Link className="Login" to="/LoginForm">Login</Link>
        </nav>
        <footer>SigmaBank Version {VERSION_NUMBER}</footer>
      </div>
    );
  }
}
