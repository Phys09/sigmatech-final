import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import "../css/navbar.css";

export default function NavbarMain() {
  const auth = useContext(AuthContext);
  var navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    if (auth.loggedin == false) {
      navigate("/login");
    } else {
      navigate("/transactions");
    }
  }

  return (
    <div className="TopNav">
      <Link to="/">
        <header className="Logo">ΣBank | Home</header>
      </Link>
      <div className="BoxCredentials">
        <Link className="Login" to="/login" onClick={handleClick}>
          Login
        </Link>
        <Link className="Signup" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
}
