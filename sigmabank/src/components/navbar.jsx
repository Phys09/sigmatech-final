import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

export default function NavbarMain() {
  var navigate = useNavigate();
  const [cookies] = useCookies("user");
  function handleClick(event) {
    event.preventDefault();
    if (!cookies.userId) {
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
