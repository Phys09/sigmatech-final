import React, { useState } from "react";
import { endpoint, POST_FETCH } from '../APIfunctions';

// Returns a <div> containing the account name and amount.
export const Balance = () => {
  const [isLoading, setLoading] = useState(true);

  var payload = Object.assign(
    { body: JSON.stringify({ accountName: 1 }) },
    POST_FETCH
  );

  var amount = 0;

  fetch(endpoint("get_bank_account"), payload)
    .then((resp) => resp.json())
    .then(body => {
      // Get the account balance and change to "money" format
      if (body.length > 0) {
        console.log("yea");
        amount = parseInt(body[0].balance).toFixed(2);
        console.log(amount);
      }
      setLoading(false);
    })
  ;
  
  if (isLoading) {
    console.log("Lol");
    return (
      <div>
        Loading...
      </div>
    );
  }
  console.log("DONE");
  return (
    <div>
      <h3>Account Balance</h3>
      <h1>${amount}</h1>
    </div>
  );
};
