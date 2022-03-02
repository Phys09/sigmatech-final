import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import { AuthContext } from "../context";
import NavbarHome from "../components/navbarHome";
import "../css/App.css";
import "../css/login.css";

export default function EditAccountForm() {
  const [newUsername, setNewUsername] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPasswd, setNewPasswd] = useState(null);
  const [newPhonenum, setNewPhonenum] = useState(null);
  const [oldPasswd, setOldPasswd] = useState(null);
  const auth = useContext(AuthContext);
  const aid = auth.user;
	const myArticle = document.querySelector('.notify');
  var navigate = useNavigate();


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
            auth.setUsername(newUsername);
          }
          if (newEmail) {
            auth.setEmail(newEmail);
          }
          if (newPasswd) {
            auth.setPassword(newPasswd);
          }
          navigate("/transactions");
          return response.json();
        }
      }).catch((err) => console.log(err));
  }

  function handleDeleteSubmit(event) {
    event.preventDefault();
    var payload = Object.assign({ body: JSON.stringify({ aid: aid, oldPasswd: oldPasswd }) }, POST_FETCH);
    fetch(endpoint("delete_account"), payload)
      .then((response) => {
        if (response.status == 400) {
          myArticle.innerHTML = "Enter your current password!";
          return Promise.reject("Enter your current password");
        } else if (response.status == 404) {
          myArticle.innerHTML = "Incorrect current password!";
          return Promise.reject("Incorrect current password");
        } else {
          auth.setUser(null);
          auth.setUsername(null);
          auth.setEmail(null);
          auth.setPassword(null);
          auth.setLoggedin(false);
          navigate("/");
          return response.json();
        }
      }).catch((err) => console.log(err));
  }

  return (
    <React.Fragment>
		  <NavbarHome/>
		  <div className="login-wrapper">
			  <h2>Edit Account</h2>
          <form>
            <div className="form-group">
              <label for="changeUsername">Change Username:</label>
              <input type="text" className="form-control" placeholder="New Username" onChange={handleChange("newUsername")}/>
            </div>
            <div className="form-group">
              <label for="changeEmail">Change Email Address:</label>
              <input type="text" className="form-control" placeholder="New Email" onChange={handleChange("newEmail")}/>
            </div>
            <div className="form-group">
              <label for="changePassword">Change Password:</label>
              <input type="password" className="form-control" placeholder="New Password" onChange={handleChange("newPasswd")}/>
            </div>
            <div className="form-group">
              <label for="changePhone">Change Phone Number:</label>
              <input type="text" className="form-control" placeholder="New Phone Number" onChange={handleChange("newPhonenum")}/>
            </div>
            <br></br>
            <div className="form-group">
              <label for="changePassword">Confirm Password:</label>
              <input type="password" className="form-control" placeholder="Current Password" onChange={handleChange("oldPasswd")}/>
            </div>
            <a id="errors" className="notify mx-auto"></a>
				    <button className="btn btn-primary btn-block" type="submit" onClick={handleEditSubmit}>
					    Update Account
				    </button>
            <button className ="btn btn-primary btn-block" type="submit" onClick={handleDeleteSubmit}>
              Delete Account
            </button>
          </form>
      </div>
	  </React.Fragment>
  );
}
