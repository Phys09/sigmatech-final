import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import NavbarLogin from "../components/navbarLogin";
import FooterMain from "../components/footer";
import "../css/login.css";
import "../css/App.css";
import { useCookies } from "react-cookie";

export default function LoginForm() {
	// BAD implementation, change it later
	const currResponse= "";
  const [email, setEmail] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);
	const myArticle = document.querySelector('.notify');
  var navigate = useNavigate();


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
    var payload = Object.assign(
      { body: JSON.stringify({ email: email, passwd: passwd }) },
      POST_FETCH
    );
    fetch(endpoint("login"), payload) 
      .then((response) => {
        if (response.status == 400) {
					myArticle.innerHTML = "Enter email and password!";
          return Promise.reject("Enter email and password");
        } else if (response.status == 404) {
					myArticle.innerHTML = "Incorrect password or account does not exist!";
          return Promise.reject("Incorrect password or account does not exist");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setCookie("userId", data[0].aid, {path: "/"});
        setCookie("username", data[0].username, {path: "/"});
        setCookie("password", passwd, {path: "/"});
        navigate("/transactions");
      })
      .catch((err) => console.log(err));
  }

  return (
	  <React.Fragment>
		  <NavbarLogin/>
	    <div className="login-wrapper d-flex">
		    <h2 className="mx-auto login-title">SigmaBank Login</h2>					    
        <form onSubmit={handleSubmit} className="centered p-3 mt-3">
			    <input
				    className="AccountInput"
				    type="text"
				    name="username"
				    placeholder="Email"
				    onChange={handleChange("email")}
			    />
			    <input
				    className="AccountInput"
				    type="password"
				    name="password"
				    placeholder="Password"
				    onChange={handleChange("passwd")}
			    />
			    <button className="btn btn-primary btn-block" type="submit">
				    Login
			    </button>
			    <a id="errors" className="notify mx-auto">
				    {/* {this.state.tags.currResponse === 0 && this.state.currResponse} */}
			    </a>
			    <a className="forgot mx-auto" href="/signup">
            Not a user? Register here!
          </a>
			  </form>
		  </div>
		  <FooterMain />
	  </React.Fragment>
  );
}
