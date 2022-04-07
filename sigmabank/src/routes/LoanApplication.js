import React, { useContext, useState } from "react";
import { endpoint, POST_FETCH } from "../APIfunctions";
import "../css/LoanApplication.css";
import "../css/App.css";
import Navbar from "../components/navbar";
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
    if (amount <= 0 || isNaN(amount) || amount > 100000) {
      return false;
    } else {
      return true;
    }
  }

  function handleSubmit(event) {
    if (FormIsValid()) {
      alert("Form is valid");
      var ownerId = cookieUser.userId;
      event.preventDefault();
      var payload = Object.assign(
        { body: JSON.stringify({ amount: amount, ownerId: ownerId }) },
        POST_FETCH
      );

      fetch(endpoint("apply_loan"), payload).then((resp) => {
        if (resp.status == 404) {
          console.log("error 404"); // DEBUG
          // Promise.reject("Unable to request a loan"); May not be needed
        }
      });
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
      <Navbar page="Apply for Loan" />
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="AccountInput"
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
