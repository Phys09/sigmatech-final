import React, { useContext, useState } from "react";
import { endpoint, POST_FETCH } from "../APIfunctions";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "../components/navbarLogin";
import FooterMain from "../components/footer";
import "../css/LoanApplication.css";
import "../css/App.css";
import NavbarMain from "../components/navbar";
import { Cookies, withCookies, useCookies } from "react-cookie";

export default function LoanApplicationForm() {

    const [ownerId, setOwnerId] = useState(useCookies("user").userId); // id of the owner
    const [amount, setAmount] = useState(null); // Amount to request for a loan


  /**
   * Method checks if the form was filled out properly by checking the state to see what was processed.
   * 
   * @returns true if form is valid, false  otherwise.
   * 
   */
  function FormIsValid() {
    // Check ownerId
    if(ownerId === "" && amount <= 0){
      return false;
    }
    
    return true;
  }

  function handleSubmit(event) {
    // Remove after done
    
    event.preventDefault();
    var payload = Object.assign({ body: JSON.stringify({amount: amount}) });

    if(FormIsValid()){
      alert("Form is valid")
    } else {
      alert("Form is invalid");
    }
  }

  function handleChange(event) {
    console.log(ownerId); // DEBUG: State the owner's id to the console
    setAmount(event.target.value);
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
        <input type="submit" value="Submit Request" />
      </form>
    </div>
  );
}


