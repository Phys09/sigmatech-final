import React, { useContext, useState } from "react";
import { Transaction } from '../components/Transaction';
import { Link, useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import { AuthContext } from "../context";
import NavbarLogin from "../components/navbarLogin";
import FooterMain from "../components/footer";
import "../css/login.css";
import "../css/App.css";

export default function AdminPanel() {
  const [accountID, setAccountID] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const auth = useContext(AuthContext); 
	const myArticle = document.querySelector('.notify');
  var navigate = useNavigate();

  function handleChange(value) {
      return (event) => {
          if (value == "accountID") {
              setAccountID(event.target.value);
          }
      }
  }

  function handleSubmit(event) {
    event.preventDefault();
    var payload = Object.assign(
      { body: JSON.stringify({ accountName: accountID, passwd: "SIGMA_ADMIN_PASSWORD" }) },  // this is really insecure lol, change this later
      POST_FETCH
    );
    fetch(endpoint("get_transactions"), payload)
    .then((resp) => resp.json())
    .then(body => setTransactions(body))
    .catch((err) => console.log(err));
  }

    return (

  // use React.Fragment to avoid extra <div>
  // return (
	<React.Fragment>
		<NavbarLogin/>
		<div className="login-wrapper d-flex">

			<h2 className="mx-auto login-title">SigmaBank Admin Panel</h2>
					
			<form onSubmit={handleSubmit} className=" p-3 mt-3">
				<input
					className="form-field d-flex align-items-center"
					type="text"
					name="account"
					placeholder="Account ID"
					onChange={handleChange("accountID")}
				/>
				<br />
				<button className="btn btn-primary btn-block" type="submit">
					Get Transactions
				</button>
				<p id="errors" className="notify mx-auto">
					
				</p>
			</form>
		</div>

    <div>
      {
        transactions &&
        <>
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
        </>
      }
    </div>
		<FooterMain />
	</React.Fragment>
  );
}