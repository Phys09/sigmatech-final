import { Link } from "react-router-dom";
import React, { Component } from "react";
import "../css/navbar.css";

class NavbarMain extends Component {
  state = {
    version: 1,
  };

  render() {
    return (
      <div className="TopNav">
        <Link to="/">
          <header className="Logo">ΣBank | Home</header>
        </Link>
        <div className="BoxCredentials">
          <Link className="Login" to="/login">
            Login
          </Link>
          <Link className="Signup" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    );
  }
}

export default NavbarMain;
