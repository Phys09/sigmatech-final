import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import "../css/navbar.css";

export default function NavbarHome() {
    const auth = useContext(AuthContext);
    var navigate = useNavigate();

    function handleClick(event) {
        event.preventDefault();
        auth.setUser(null);
        auth.setUsername(null);
        auth.setLoggedin(false);
        navigate("/");
    }

    return (
        <div className="TopNav padding-top">
            <Link to="/">
                <header className="Logo flex-start">ΣBank | Home</header>
            </Link>
            <div className="Options">
                <button className="Logout" onClick={handleClick}>
                    Logout
			    </button>
            </div>
        </div>
    );
}
