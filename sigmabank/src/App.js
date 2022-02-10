/**
 * This file is responsible for the main 'HomePage' components.
 * Links to other parts of the site, etc...
 */
import React from "react";
import "./css/App.css";
import "./css/HomePage.css";
import { Link } from "react-router-dom";

const VERSION_NUMBER = "0.1.1";

export default class App extends React.Component {
  render() {
    return (
        <div className="App">
          <div className="TopNav">
            <Link to="/">
              <header className="Logo">ΣBank | Home</header>
            </Link>
            <div className="BoxCredentials">
              <Link className="Login" to="/LoginForm">
                Login
              </Link>
              <Link className="Signup" to="/CreateAccountForm">
                Signup
              </Link>
            </div>
            </div>
            <div className="HomePageMatter">
              <h1 className="Description">Your Next Bank is Here!</h1>
              <Link className="Signup" to="/CreateAccountForm">
                Signup
              </Link>
          </div>
          <footer>SigmaBank Version {VERSION_NUMBER}</footer>
        </div>
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
