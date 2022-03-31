import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import FooterMain from "../components/footer";
import Navbar from "../components/navbar";
import "../css/App.css";
import "../css/login.css";

export default function LoginForm() {
  const [email, setEmail] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);
  const aid = cookies.userId;

	const myArticle = document.querySelector('.notify');
  var navigate = useNavigate();

  useEffect(() => {
    if (aid) {
      alert("Already logged in.");
      navigate("/transactions");
    }
  }, [])

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
        setCookie("type", data[0].type, {path: "/"});

        setCookie("username", data[0].username, {path: "/"});
        setCookie("password", passwd, {path: "/"});
        navigate("/transactions");
      })
      .catch((err) => console.log(err));
  }

  return (
	  <React.Fragment>
		  <Navbar page="Login"/>
	    <div className="login-wrapper">
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
			    <a id="errors" className="notify mx-auto"></a>
			    <a className="forgot mx-auto" href="/signup">
            Not a user? Register here!
          </a>
			  </form>
		  </div>
		  <FooterMain />
	  </React.Fragment>
  );
}
