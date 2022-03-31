import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import Navbar from "../components/navbar";
import "../css/App.css";
import "../css/CreateAccount.css";

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
      alert("Please ensure that all fields are filled out!")
    }
  }

  return (
    <div className="CreateAccountForm">
      <Navbar page="Create Account" />
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
          <input
            className="AccountInput"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange(setUsername)}
          />
          <input
            className="AccountInput"
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange(setEmail)}
          />
          <input
            className="AccountInput"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange(setPassword)}
          />
          <input
            className="AccountInput"
            type="text"
            name="phonenum"
            placeholder="Phone Number"
            onChange={handleChange(setPhoneNum)}
          />
        <button className="AccountButtons" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
