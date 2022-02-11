// navbar, but without login/logout button, using Bootstrap
// WORK IN PROGRESS; should be made better in sprint 2
import { Link } from "react-router-dom";
import React, { Component } from "react";
import "../css/navbar.css";

class NavbarLogin extends Component {
  state = {
    version: 1,
  };

  render() {
    return (
      <div className="navbar navbar-light bg-light">
        <li className="nav-item">
            <a className="nav-link Logo" href="/">ΣBank | Home</a>
        </li>
        {/* <Link to="/">
          <header className="Logo">ΣBank | Home</header>
        </Link> */}
      </div>
    );
  }
}

export default NavbarLogin;
