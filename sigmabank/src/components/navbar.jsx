import React, {useState} from "react";

import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import "../css/navbar.css";

export default function Navbar(props) {
    const [cookies, setCookie, removeCookie] = useCookies("user");

    const type = cookies.type;
    const user = cookies.username;

    var navigate = useNavigate();

    function handleClick(value) {
        return (event) => {
            event.preventDefault();
            switch(value){
                case "edit":
                    navigate("/edit")
                    break;
                case "admin":
                    navigate("/admin")
                    break;
                case "transactions":
                    navigate("/transactions")
                    break;
                case "login":
                    navigate("/login")
                    break;
                case "signup":
                    navigate("/signup")
                    break;
                case "makeTransactions":
                    navigate("/makeTransactions")
                    break;
                case "makeAutopay":
                    navigate("/makeAutopay")
                    break;
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

    function adminCase(){
        if(type == 1){
            return <button className="NavbarButtonLoggedIn" onClick={handleClick("admin")}>Admin Panel</button>
        }
    }
    function loginDisplay(){
        if(user){
            return(
            <div className="Options">
                {adminCase()}
                <button className="NavbarButtonLoggedIn" onClick={handleClick("transactions")}>Transactions</button>
                <button className="NavbarButtonLoggedIn" onClick={handleClick("makeTransactions")}>Make Transactions</button>
                <button className="NavbarButtonLoggedIn" onClick={handleClick("makeAutopay")}>Setup Autopay</button>
                <button className="NavbarButtonLoggedIn" onClick={handleClick("edit")}>Edit Account</button>
                <button className="NavbarButtonLoggedIn" onClick={handleLogoutClick}>Logout</button>
            </div>
            )
        }
        else{
            return(
                <div className="OptionsLoggedout">
                    <button className="NavbarButton" onClick={handleClick("signup")}>
                        Signup
                    </button>
                    <button className="NavbarButton" onClick={handleClick("login")}>
                        Login
                    </button>
                </div>
                )
        }
    }

    return (
        <div className="padding-top">
            <header>
            <Link className="Logo logolink" to="/">
                ΣBank <span className="logoSecondHalf">| {props.page}</span>
            </Link>
            </header>
            {loginDisplay()}
        </div>
    );
}
