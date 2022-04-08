
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { endpoint, POST_FETCH } from '../APIfunctions';
import "../css/CreateAccount.css"

// Takes in a JSON object representing a transaction and
// returns a table row representing the transaction.
export function Transaction(props){
  const amount = parseFloat(props.transaction.amount).toFixed(2);
  const [processed, setProcessed] = useState(props.transaction.processed);
  const [passInput, setPassInput] = useState(false);
  const [pass, setPass] = useState("");
  // Get the account id
  const [cookies] = useCookies("user");
  const bid = cookies.userId;
  var counterparty = props.transaction.toaccount;

  var amountClass = 'loss';
  var sign = '-';
  
function passHandler(e){
  e.preventDefault();
  var payload = Object.assign(
    { body: JSON.stringify({ transactionId: props.transaction.tid, passwd: pass }) },
    POST_FETCH
  );
  fetch(endpoint("complete_transaction"), payload)
  .then((resp) => {
    if(resp.status == 400){
      alert("Incorrect Password")
    }
    else if(resp.status == 404){
      alert("Transaction not found")
    }
    else if (resp.status == 200) {
      alert("Transaction processed")
      setProcessed(true);
    }
  })

}

  function acceptanceDisplay(){
    if(!processed && !passInput){
      if (props.transaction.toaccount==bid) {
        return <td className="processingSection"><button className="AccountButtons" onClick={() => setPassInput(true)}>Process</button></td>
      }
      else {
        return <td>Pending</td>
      }
    }
    else if(!processed && passInput){
      return (
      <td className="processingSection">
        <form onSubmit={passHandler}>
          <input className="AccountInput" placeholder='Password' type="password" onChange={(e)=> setPass(e.target.value)} />
          <button className="AccountButtons" type="submit">Submit</button>
          <button className="AccountButtons" onClick={() => setPassInput(false)}>Cancel</button>
        </form>
      </td>
      )
    }
    else{
      return <td>Processed</td>
    }
  }
  /**
   * Transaction times have a format of 'YYYY-MM-DDTHH:MM:SS.SSSZ', but we only
   * need the date.
   */
  const date = (props.transaction.transactiontime).split("T")[0];
  /**
   * Depending on whether the amount was sent or received, get the correct sign 
   * so we get e.g. -$x.xx instead of $-x.xx, and change transaction amount
   * colour according to the value.
   */
  if (props.transaction.toaccount == bid) {
    counterparty = props.transaction.fromaccount;
    amountClass = 'gain';
    sign = '+';
  }

  return (
    <tr>
      <td>{counterparty}</td>
      <td>{date}</td>
      <td className={amountClass}>{sign}${Math.abs(amount)}</td>
      {acceptanceDisplay()}
    </tr>
  );
};
