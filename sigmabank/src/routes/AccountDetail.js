import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import { AuthContext } from "../context";
import NavbarLogin from "../components/navbarLogin";
import FooterMain from "../components/footer";
import "../css/login.css";
import "../css/App.css";

export default function AccountDetail() {


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

			<h2 className="mx-auto login-title"> Account mainpage</h2>

            <br></br><br></br><br></br>
            <div>email: {email}</div>
            
            <Link className="btn btn-primary" to="/edit">
            Edit Account Details
          </Link>
            <br></br>
            {/* NOT IMPLEMENTED YET */}
          <Link className="btn btn-primary" to="/">
            View Transactions
          </Link>

		</div>


		<FooterMain />
	</React.Fragment>
  );
}