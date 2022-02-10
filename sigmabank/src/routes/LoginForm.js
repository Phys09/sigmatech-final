import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {endpoint, POST_FETCH} from '../APIfunctions';
import {AuthContext} from '../context';

export default function LoginForm() {
    const [email, setEmail] = useState(null);
    const [passwd, setPasswd] = useState(null);
    const auth = useContext(AuthContext);
    //var navigate = useNavigate();

    function handleChange(value) {
        return (event) => {
            if (value == "email") {
                setEmail(event.target.value);
            } else if (value == "passwd") {
                setPasswd(event.target.value);
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        var payload = Object.assign({"body": JSON.stringify({"email": email, "passwd": passwd})}, POST_FETCH);
        fetch(endpoint("login"), payload).then(response => {
            if (response.status == 400) {
                return Promise.reject("Enter email and password");
            } else if (response.status == 404) {
                return Promise.reject("Incorrect password or account does not exist");
            } else {
                auth.setLoggedin(true);
                return response.json();
            }}).then(data => {auth.setUser(data[0].aid);}).catch(err => console.log(err));
    }

    return (
        <div className='LoginForm'>
            <header>
                <Link className="logolink" to="/">
                    <span className="logo">ΣBank </span>
                    <span className="logoSecondHalf">| Account Login</span>
                </Link>
            </header>
            <h1>SigmaBank Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    className="AccountInput" 
                    type="text" 
                    name="username" 
                    placeholder="Email" 
                    onChange={handleChange("email")}
                />
                <br/>
                <input 
                    className="AccountInput" 
                    type="text" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange("passwd")}
                />
                <br/>
                <button className="AccountButtons" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
