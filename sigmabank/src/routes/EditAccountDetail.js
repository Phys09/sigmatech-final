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
  const [email, setEmail] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const auth = useContext(AuthContext); 
	const myArticle = document.querySelector('.notify');
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

  }

    return (
	<React.Fragment>
		<NavbarLogin/>
		<div className="login-wrapper d-flex">

			<h2 className="mx-auto login-title">Change Account Details</h2>

            <form>
            <div >Current User: {email}</div>
            <div className="form-group ">
                <label for="changeEmail">Current Email address: {email}</label>
                <input type="email" classclassName="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter new email"/>
                <button className ="btn btn-secondary" id="updateEmail">Update Email</button>
            </div>
            <div className="form-group">
                <label for="changePassword">Change Password</label>
                <input type="password" className="form-control" id="currPassword" placeholder="Current Password"/>
                <input type="password" className="form-control" id="newPassword" placeholder="New Password"/>
                <input type="password" className="form-control" id="newPassword2" placeholder="Retype Password"/>
                <button className ="btn btn-secondary" id="updatePassword">Update password</button>
            </div>
            <br></br>
            <div className="form-group">
                <label for="deleteUser">delete user</label>
                <input type="password" className="form-control" id="currPassword" placeholder="Confirm Password"/>
                <button className ="btn btn-secondary" id="deleteAccount">delete Account</button>
            </div>
            <button type="submit" className="btn btn-primary" href="/">Done</button>
            </form>
            {/* submit should go to homepage; not working */}


		</div>


		<FooterMain />
	</React.Fragment>
  );
}