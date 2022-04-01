import React, { useContext, useState } from "react";
import { endpoint, POST_FETCH } from "../APIfunctions";
import { useNavigate } from "react-router-dom";
// import NavbarLogin from "../components/navbarLogin";
import FooterMain from "../components/footer";
import "../css/LoanApplication.css";
import "../css/App.css";
import NavbarMain from "../components/navbar";
import { useCookies } from "react-cookie";

export default function LoanApplicationForm() {

  const [amount, setAmount] = useState(null); // Amount to request for a loan
  const [cookieUser] = useCookies("user"); // Store the user information
  /**
   * Method checks if the form was filled out properly by checking the state to see what was processed.
   * 
   * @returns true if form is valid, false  otherwise.
   * 
   */
  function FormIsValid() {
    // Check ownerId
    if (amount <= 0 || isNaN(amount)) {
      return false;
    } else {
      return true;
    }
  }

  function handleSubmit(event) {
    var ownerId = cookieUser.userId;
    event.preventDefault();
    var payload = Object.assign(
      {body: JSON.stringify(
        {amount: amount, ownerId: ownerId})
    }, POST_FETCH);

    console.log("Before Fetch"); // DEBUG

    fetch(endpoint("apply_loan"), payload)
      .then((resp) => {
        if (resp.status == 404) {
          console.log("error 404"); // DEBUG
          // Promise.reject("Unable to request a loan"); May not be needed
        }
    });

    console.log("After Fetch"); // DEBUG
    if(FormIsValid()){
      alert("Form is valid")
    } else {
      alert("Form is invalid");
    }
  }

  function handleChange(event) {
    setAmount(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className="LoanPage">
      <NavbarMain />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Amount to request"
            onChange={handleChange}
          />
        </label>
        <input className="btn_submit" type="submit" value="Submit Request" />
      </form>
    </div>
  );
}


