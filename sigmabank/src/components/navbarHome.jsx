import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";

export default function NavbarHome() {
    const [cookies, setCookie, removeCookie] = useCookies("user");
    const type = cookies.type;
    var navigate = useNavigate();

    function handleClick(value) {
        return (event) => {
            event.preventDefault();
            if (value == "admin") {
                navigate("/admin");
            } else if (value == "edit") {
                navigate("/edit");
            }
        }
    }

    function handleLogoutClick(event) {
        event.preventDefault();
        removeCookie("userId", {path:"/"});
        removeCookie("type", {path:"/"});
        removeCookie("username", {path:"/"});
        removeCookie("password", {path:"/"});
        navigate("/");
    }

    if (type == 1) {
        return (
            <div className="TopNav padding-top">
                <Link to="/">
                    <header className="Logo flex-start">ΣBank | Home</header>
                </Link>
                <div className="Options">
                    <button className="Admin" onClick={handleClick("admin")}>
                        Admin Panel
                    </button>
                    <button className="Edit" onClick={handleClick("edit")}>
                        Edit Account
                    </button>
                    <button className="Logout" onClick={handleLogoutClick}>
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="TopNav padding-top">
            <Link to="/">
                <header className="Logo flex-start">ΣBank | Home</header>
            </Link>
            <div className="Options">
                <button className="Edit" onClick={handleClick("edit")}>
                    Edit Account
                </button>
                <button className="Logout" onClick={handleLogoutClick}>
                    Logout
			    </button>
            </div>
        </div>
    );
}
