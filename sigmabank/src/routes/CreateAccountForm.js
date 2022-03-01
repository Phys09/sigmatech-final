import React, { useState } from "react";
import "../css/CreateAccount.css";
import "../css/App.css";
import { endpoint, POST_FETCH } from "../APIfunctions";
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccountForm (){
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [phonenum, setPhoneNum] = useState(null);
    var navigate = useNavigate();

  function handleChange(updateFunc) {
    return (event) => {
      updateFunc(event.target.value);
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(email && password && phonenum && username){
      var payload = Object.assign(
        { body: JSON.stringify({email: email, username: username, password: password, phonenum: phonenum}) },
        POST_FETCH
      );
      fetch(endpoint("create_account"), payload).then((resp) =>
        console.log(resp)
      );
      navigate("/");
    }
    else{
      alert("Please ensure that all fields are filled out")
    }
  }

    return (
      <div className="CreateAccountForm">
        <header>
          <Link className="logolink" to="/">
            <span className="logo">ΣBank</span>
            <span className="logoSecondHalf">| Create Account</span>
          </Link>
        </header>
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
        <input
            className="AccountInput"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange(setUsername)}
          />
          <br/>
          <input
            className="AccountInput"
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange(setEmail)}
          />
          <br />
          <input
            className="AccountInput"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange(setPassword)}
          />
          <br />
          <input
            className="AccountInput"
            type="text"
            name="phonenum"
            placeholder="Phone Number"
            onChange={handleChange(setPhoneNum)}
          />
          <br />
          <button className="AccountButtons" type="submit">
            Create Account
          </button>
        </form>
      </div>
    );
}
