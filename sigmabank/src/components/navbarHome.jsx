import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import "../css/navbar.css";

export default function NavbarHome() {
    const auth = useContext(AuthContext);
    var navigate = useNavigate();

    function handleEditClick(event) {
        event.preventDefault();
        navigate("/edit");
    }

    function handleLogoutClick(event) {
        event.preventDefault();
        auth.setUser(null);
        auth.setUsername(null);
        auth.setEmail(null);
        auth.setPassword(null);
        auth.setLoggedin(false);
        navigate("/");
    }

    return (
        <div className="TopNav padding-top">
            <Link to="/">
                <header className="Logo flex-start">ΣBank | Home</header>
            </Link>
            <div className="Options">
                <button className="Edit" onClick={handleEditClick}>
                    Edit Account
                </button>
                <button className="Logout" onClick={handleLogoutClick}>
                    Logout
			    </button>
            </div>
        </div>
    );
}
