import React, { useEffect, useState } from "react";
import { Transaction } from './Transaction';
import { endpoint, POST_FETCH } from '../APIfunctions';
import { useCookies } from "react-cookie";

// Returns a <div> containing an account's transaction history.
export const TransactionList = () => {
  // Save the fetched data
  const [transactions, setTransactions] = useState([]);

  // Get the account id
  const [cookies] = useCookies("user");
  const aid = cookies.userId;
  const username = cookies.username;
  const password = cookies.password;

  // Payload for the 'get_transactions' endpoint
  var payload = Object.assign(
    { body: JSON.stringify({ accountName: aid, passwd: password }) },
    POST_FETCH
  );
  
  // To wait for all information before rendering, delay using 'useEffect()'
  useEffect(() => {
    fetch(endpoint("get_transactions"), payload)
    .then((resp) => resp.json())
    .then(body => setTransactions(body));
  }, []);
  
  // Return header and table of transactions only when required information is received
  return (
    <div>
      {
        transactions &&
        <>
          <h3>Transaction History for {username}</h3>
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
  );
};
