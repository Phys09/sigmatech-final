import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import Navbar from "../components/navbar";
import "../css/App.css";
import "../css/login.css";

export default function EditAccountForm() {
  const [newUsername, setNewUsername] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPasswd, setNewPasswd] = useState(null);
  const [newPhonenum, setNewPhonenum] = useState(null);
  const [oldPasswd, setOldPasswd] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies("user");
  const aid = cookies.userId;
	const myArticle = document.querySelector('.notify');
  var navigate = useNavigate();

  useEffect(() => {
    if (!aid) {
      alert("Please login to use this page.");
      navigate("/login");
    }
  }, [])

  function handleChange(value) {
    return (event) => {
      if (value == "newUsername") {
        setNewUsername(event.target.value);
      } else if (value == "newEmail") {
        setNewEmail(event.target.value);
      } else if (value == "newPasswd") {
        setNewPasswd(event.target.value);
      } else if (value == "newPhonenum") {
        setNewPhonenum(event.target.value);
      } else if (value == "oldPasswd") {
        setOldPasswd(event.target.value);
      } 
    }
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    var payload = Object.assign({ body: JSON.stringify(
      { aid: aid, 
        newUsername: newUsername, 
        newEmail: newEmail,
        newPasswd: newPasswd,
        newPhonenum: newPhonenum,
        oldPasswd: oldPasswd 
      }
    ) }, POST_FETCH);
    fetch(endpoint("edit_account"), payload) 
      .then((response) => {
        if (response.status == 400) {
					myArticle.innerHTML = "Enter your current password!";
          return Promise.reject("Enter your current password");
        } else if (response.status == 404) {
            myArticle.innerHTML = "Incorrect current password!";
            return Promise.reject("Incorrect current password");
        } else {
          if (newUsername) {
            setCookie("username", newUsername, {path: "/"});
          }
          if (newPasswd) {
            setCookie("password", newPasswd, {path: "/"});
          }
          navigate("/transactions");
          return response.json();
        }
      }).catch((err) => console.log(err));
  }

  function handleShutdownSubmit(event) {
    event.preventDefault();
    var payload = Object.assign({ body: JSON.stringify({ aid: aid, oldPasswd: oldPasswd }) }, POST_FETCH);
    fetch(endpoint("shutdown_account"), payload)
      .then((response) => {
        if (response.status == 400) {
          myArticle.innerHTML = "Enter your current password!";
          return Promise.reject("Enter your current password");
        } else if (response.status == 404) {
          myArticle.innerHTML = "Incorrect current password!";
          return Promise.reject("Incorrect current password");
        } else {
          removeCookie("userId", {path:"/"});
          removeCookie("type", {path:"/"});
          removeCookie("username", {path:"/"});
          removeCookie("password", {path:"/"});

          navigate("/");
          return response.json();
        }
      }).catch((err) => console.log(err));
  }

  return (
    <React.Fragment>
		  <Navbar page="Edit Account"/>
		  <div className="login-wrapper">
			  <h2>Edit Account</h2>
          <form>
            <div className="form-group">
              <input type="text" className="AccountInput" placeholder="New Username" onChange={handleChange("newUsername")}/>
              <input type="text" className="AccountInput" placeholder="New Email" onChange={handleChange("newEmail")}/>
              <input type="password" className="AccountInput" placeholder="New Password" onChange={handleChange("newPasswd")}/>
              <input type="text" className="AccountInput" placeholder="New Phone Number" onChange={handleChange("newPhonenum")}/>
            </div>
            <br></br>
            <div className="form-group">
              <input type="password" className="AccountInput" placeholder="Current Password" onChange={handleChange("oldPasswd")}/>
            </div>
            <a id="errors" className="notify mx-auto"></a>
				    <button className="btn btn-primary btn-block" type="submit" onClick={handleEditSubmit}>
					    Update Account
				    </button>
            <button className ="btn btn-primary btn-block" type="submit" onClick={handleShutdownSubmit}>
              Shutdown Account
            </button>
          </form>
      </div>
	  </React.Fragment>
  );
}
