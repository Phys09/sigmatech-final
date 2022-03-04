import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../css/navbar.css";

export default function NavbarHome() {
    const [cookies, setCookie, removeCookie] = useCookies("user");
    var navigate = useNavigate();

    function handleEditClick(event) {
        event.preventDefault();
        navigate("/edit");
    }

    function handleLogoutClick(event) {
        event.preventDefault();
        removeCookie("userId", {path:"/"})
        removeCookie("username", {path:"/"})
        removeCookie("password", {path:"/"})
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
