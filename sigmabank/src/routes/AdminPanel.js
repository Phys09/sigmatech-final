import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { endpoint, POST_FETCH } from "../APIfunctions";
import FooterMain from "../components/footer";
import Navbar from "../components/navbar";
import { Transaction } from '../components/Transaction';
import "../css/App.css";
import "../css/login.css";
import EditAccountForm from "./EditAccountDetail";

export default function AdminPanel() {
  const [accountID, setAccountID] = useState(null);
  const [newUsername, setTargetUsername] = useState(null);
  const [newEmail, setTargetEmail] = useState(null);
  const [newPasswd, setTargetPasswd] = useState(null);
  const [newPhonenum, setTargetPhonenum] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const [cookies] = useCookies(["user"]);
  const type = cookies.type;
	const myArticle = document.querySelector('.notify');
  var navigate = useNavigate();

  useEffect(() => {
    if (!type) {
      alert("Please login as admin to use this page.");
      navigate("/login");
    } else if (type != 1) {
      alert("Unauthorized access to this page.");
      navigate("/");
    }
  }, [])

  function handleChange(value) {
    return (event) => {
      if (value == "accountID") {
        setAccountID(event.target.value);
      }
      if (value == "newUsername") {
        setTargetUsername(event.target.value);
      }
      if (value == "newEmail") {
        setTargetEmail(event.target.value);
      }
      if (value == "newPasswd") {
        setTargetPasswd(event.target.value);
      }
      if (value == "newPhonenum") {
        setTargetPhonenum(event.target.value);
      }
    }
  }

  function handleTransactionsSubmit(event) {
    event.preventDefault();
    var payload = Object.assign(
      { body: JSON.stringify({ aid: accountID, passwd: "SIGMA_ADMIN_PASSWORD" }) },
      POST_FETCH
    );
    fetch(endpoint("get_transactions"), payload)
      .then((response) => {
        if (response.status == 400) {
					myArticle.innerHTML = "Enter account ID!";
          return Promise.reject("Enter account ID");
        } else if (response.status == 404) {
					myArticle.innerHTML = "Account does not exist or has no transaction history!";
          return Promise.reject("Account does not exist or has no transaction history");
        } else {
          return response.json();
        }
      })
      .then(body => setTransactions(body))
      .catch((err) => console.log(err)
    );
  }

  function handleShutdownSubmit(event) {
    event.preventDefault();
    var payload = Object.assign(
      { body: JSON.stringify({ aid: accountID, oldPasswd: "SIGMA_ADMIN_PASSWORD" }) }, 
      POST_FETCH
    );
    fetch(endpoint("shutdown_account"), payload)
      .then((response) => {
        if (response.status == 400) {
          myArticle.innerHTML = "Enter account ID!";
          return Promise.reject("Enter account ID");
        } else if (response.status == 404) {
          myArticle.innerHTML = "Account does not exist!";
          return Promise.reject("Account does not exist");
        } else {
          myArticle.innerHTML = "Account shutdown successful!";
          return response.json();
        }
      })
      .catch((err) => console.log(err)
    );
  }

  function handleReactivateSubmit(event) {
    event.preventDefault();
    var payload = Object.assign({ body: JSON.stringify({ aid: accountID }) }, POST_FETCH);
    fetch(endpoint("reactivate_account"), payload)
      .then((response) => {
        if (response.status == 400) {
          myArticle.innerHTML = "Enter account ID!";
          return Promise.reject("Enter account ID");
        } else if (response.status == 404) {
          myArticle.innerHTML = "Account does not exist!";
          return Promise.reject("Account does not exist");
        } else {
          myArticle.innerHTML = "Account reactivation successful!";
          return response.json();
        }
      })
      .catch((err) => console.log(err)
    );
  }

  function handleEditTarget(event) {
    event.preventDefault();
    var payload = Object.assign({body: JSON.stringify({
      aid: accountID,
      newUsername: newUsername, 
      newEmail: newEmail,
      newPasswd: newPasswd,
      newPhonenum: newPhonenum,
      oldPasswd: "SIGMA_ADMIN_PASSWORD"
    })}, POST_FETCH);
    fetch(endpoint("edit_account"), payload).then((resp) => {
      if (resp.status == 400) {
        myArticle.innerHTML = "Error"
      }
      if (resp.status == 200) {
        myArticle.innerHTML = "Details updated!"
        setTimeout(()=>myArticle.innerHTML="", 3000);
      }
    })
  }

  return (
	  <React.Fragment>
		  <Navbar page="Admin Panel"/>
      <h2 className="mx-auto login-title">SigmaBank Admin Panel</h2>
		  <div className="login-wrapper d-flex">
			  <form className=" p-3 mt-3">
				  <input
					  className="form-field d-flex align-items-center"
					  type="text"
            pattern="[0-9]*"
					  name="account"
					  placeholder="Account ID"
					  onChange={handleChange("accountID")}
				  />
				  <button className="btn btn-primary btn-block" type="submit" onClick={handleTransactionsSubmit}>
					  Get Transactions
				  </button>
          <button className="btn btn-primary btn-block" type="submit" onClick={handleShutdownSubmit}>
					  Shutdown Account
				  </button>
          <button className="btn btn-primary btn-block" type="submit" onClick={handleReactivateSubmit}>
            Reactivate Account
				  </button>
          <br></br>
				  <p id="errors" className="notify mx-auto"></p>
			  </form>
        <form>
          <h3>Edit Account Details</h3>
          <input type="text" className="AccountInput" placeholder="New Username" onChange={handleChange("newUsername")}/>
          <input type="text" className="AccountInput" placeholder="New Email" onChange={handleChange("newEmail")}/>
          <input type="password" className="AccountInput" placeholder="New Password" onChange={handleChange("newPasswd")}/>
          <input type="text" className="AccountInput" placeholder="New Phone Number" onChange={handleChange("newPhonenum")}/>
          <button className ="btn btn-primary btn-block" onClick={handleEditTarget}>Submit Changes</button>
        </form>
		  </div>
      <div> { transactions && <>
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
		  <FooterMain />
	  </React.Fragment>
  );
}
