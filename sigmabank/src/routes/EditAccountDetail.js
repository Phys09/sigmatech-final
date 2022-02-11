import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import { AuthContext } from "../context";
import NavbarLogin from "../components/navbarLogin";
import FooterMain from "../components/footer";
import "../css/login.css";
import "../css/App.css";

export default function EditAccountForm() {


	// BAD implementation, change it later
  const currResponse= "";
  const [newUsername, setNewUsername] = useState(null);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [oldPasswd, setOldPasswd] = useState(null);
  const [newPasswd, setNewPasswd] = useState(null);
  const [newPhonenum, setNewPhonenum] = useState(null);
  const auth = useContext(AuthContext);
  //const aid = auth.user;
	const myArticle = document.querySelector('.notify');
  var navigate = useNavigate();


    function handleChange(value) {
        return (event) => {
            if (value == "newUsername") {
              setNewUsername(event.target.value);
            } else if (value == "currentEmail") {
              setCurrentEmail(event.target.value);
            } else if (value == "newEmail") {
              setNewEmail(event.target.value);
            } else if (value == "oldPasswd") {
              setOldPasswd(event.target.value);
            } else if (value == "newPasswd") {
              setNewPasswd(event.target.value);
            } else if (value == "newPhonenum") {
              setNewPhonenum(event.target.value);
            }
        }
    }

  function handleEditSubmit(event) {
    event.preventDefault();
    var payload = Object.assign(
      { body: JSON.stringify(
        { currentEmail: currentEmail, newUsername: newUsername, newEmail: newEmail, oldPasswd: oldPasswd, newPasswd: newPasswd, newPhonenum: newPhonenum }) },
      POST_FETCH
    );
    fetch(endpoint("edit_account"), payload) 
      .then((response) => {
        if (response.status == 400) {
					myArticle.innerHTML = "Enter your current password";
          return Promise.reject("Enter your current password");
        } else if (response.status == 404) {
            myArticle.innerHTML = "Incorrect current password";
            return Promise.reject("Incorrect current password");
        } else {
          auth.setUsername(newUsername);
          navigate("/transactions");
          return response.json();
        }
      }).catch((err) => console.log(err));
  }

  function handleDeleteSubmit(event) {
    event.preventDefault();
    var payload = Object.assign({ body: JSON.stringify({ email: currentEmail }) }, POST_FETCH);
    fetch(endpoint("delete_account"), payload);
  }

    return (
	<React.Fragment>
		<NavbarLogin/>
		<div className="login-wrapper d-flex">

			<h2 className="mx-auto login-title">Change Account Details</h2>

            <form>
            <div className="form-group ">
                <label for="changeUsername">Change Username:</label>
                <input type="text" className="form-control" placeholder="New Username" onChange={handleChange("newUsername")}/>
            </div>
            <div className="form-group ">
                <label for="changeEmail">Change Email Address:</label>
                <input type="text" className="form-control" placeholder="Current Email" onChange={handleChange("currentEmail")}/>
                <input type="text" className="form-control" placeholder="New Email" onChange={handleChange("newEmail")}/>
            </div>
            <div className="form-group">
                <label for="changePassword">Change Password:</label>
                <input type="text" className="form-control" placeholder="Current Password" onChange={handleChange("oldPasswd")}/>
                <input type="text" className="form-control" placeholder="New Password" onChange={handleChange("newPasswd")}/>
            </div>
            <div className="form-group">
                <label for="changePassword">Change Phone Number:</label>
                <input type="text" className="form-control" placeholder="New Phone Number" onChange={handleChange("newPhonenum")}/>
            </div>
				    <button className="btn btn-primary btn-block" type="submit" onClick={handleEditSubmit}>
					    Update Account Details
				    </button>
            <br></br>
            <button className ="btn btn-secondary" type="submit" onClick={handleDeleteSubmit}>Delete Account</button>
            </form>
            {/* submit should go to homepage; not working */}


		</div>


		<FooterMain />
	</React.Fragment>
  );
}