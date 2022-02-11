// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// // import "../css/nav.css";

// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { endpoint, POST_FETCH } from "../APIfunctions";
// import { AuthContext } from "../context";
// import NavbarLogin from "../components/navbarLogin";
// import FooterMain from "../components/footer";
// import "../css/login.css";
// import "../css/App.css";



// class LoginMain extends Component {
//   state = {
//     version: 1,
//   };

//   	// BAD implementation, change it later
// 	const currResponse= "asdasdasd";
// 	const [email, setEmail] = useState(null);
// 	const [passwd, setPasswd] = useState(null);
// 	const auth = useContext(AuthContext);
// 	//var navigate = useNavigate();
  
// 	handleChange(value) {
// 	  return (event) => {
// 		if (value == "email") {
// 		  setEmail(event.target.value);
// 		} else if (value == "passwd") {
// 		  setPasswd(event.target.value);
// 		}
// 	  };
// 	}
  
// 	function handleSubmit(event) {
// 	  event.preventDefault();
// 	  var payload = Object.assign(
// 		{ body: JSON.stringify({ email: email, passwd: passwd }) },
// 		POST_FETCH
// 	  );
// 	  fetch(endpoint("login"), payload).then(
// 			  (resp) => {
// 				  console.log(resp);
// 				  currResponse = resp;
// 			  }			
// 			  );
// 	  auth.setUser(email);
// 	  auth.setLoggedin(true);
// 	}

//   render() {
//     return (
// 		<form onSubmit={handleSubmit} className=" p-3 mt-3">
// 			<input
// 				className="AccountInput form-field d-flex align-items-center"
// 				type="text"
// 				name="username"
// 				placeholder="Email"
// 				onChange={handleChange("email")}
// 			/>
// 			<br />
// 			<input
// 				className="AccountInput"
// 				type="text"
// 				name="password"
// 				placeholder="Password"
// 				onChange={handleChange("passwd")}
// 			/>
// 			<br />
// 			<button className="btn btn-primary btn-block" type="submit">
// 				Login
// 			</button>
// 			<a id="errors" className="notify mx-auto" href="/signup">
// 				{currResponse === 0 && currResponse}
// 			</a>
// 			<a className="forgot mx-auto" href="/signup">Not a user? Register here</a>
// 		</form>
//     );
//   }
// }

// export default LoginMain;
