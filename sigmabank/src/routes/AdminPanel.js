import React, { useState } from "react";
import { endpoint, POST_FETCH } from "../APIfunctions";
import NavbarLogin from "../components/navbarLogin";
import { Transaction } from '../components/Transaction';
import "../css/App.css";
import "../css/login.css";

export default function AdminPanel() {
  const [accountID, setAccountID] = useState(null);
  const [adminPasswd, setAdminPasswd] = useState(null); // Admin Password: "SIGMA_ADMIN_PASSWORD"
  const [transactions, setTransactions] = useState([]);
	const myArticle = document.querySelector('.notify');

  function handleChange(value) {
    return (event) => {
      if (value == "accountID") {
        setAccountID(event.target.value);
      } else if (value == "adminPasswd") {
        setAdminPasswd(event.target.value);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    var payload = Object.assign(
      { body: JSON.stringify({ accountID: accountID, passwd: adminPasswd }) },
      POST_FETCH
    );
    fetch(endpoint("get_transactions"), payload)
      .then((response) => {
        if (response.status == 400) {
					myArticle.innerHTML = "Enter account ID and admin password!";
          return Promise.reject("Enter account ID and admin password");
        } else if (response.status == 404) {
					myArticle.innerHTML = "Account ID does not exist or incorrect admin password!";
          return Promise.reject("Account ID does not exist or incorrect admin password");
        } else {
          return response.json();
        }
      })
      .then(body => setTransactions(body))
      .catch((err) => console.log(err));
  }

  return (
	  <React.Fragment>
		  <NavbarLogin/>
		  <div className="login-wrapper d-flex">
			  <h2 className="mx-auto login-title">SigmaBank Admin Panel</h2>	
			  <form onSubmit={handleSubmit} className=" p-3 mt-3">
				  <input
					  className="form-field d-flex align-items-center"
					  type="text"
            pattern="[0-9]*"
					  name="account"
					  placeholder="Account ID"
					  onChange={handleChange("accountID")}
				  />
          <br/>
          <h4>Confirm As Admin:</h4>
          <input
					  className="form-field d-flex align-items-center"
					  type="password"
					  name="account"
					  placeholder="Admin Password"
					  onChange={handleChange("adminPasswd")}
				  />
				  <button className="btn btn-primary btn-block" type="submit">
					  Get Transactions
				  </button>
				  <a id="errors" className="notify mx-auto"></a>
			  </form>
		  </div>
      <br/>
      <div> 
        { transactions && <>
          <h3>Transaction History</h3>
          <table>
            <thead>
              <tr>
                <th>Counterparty ID</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (<Transaction key={transaction.tid} transaction={transaction} />))}
            </tbody>
          </table>
        </> } 
      </div>
	  </React.Fragment>
  );
}
