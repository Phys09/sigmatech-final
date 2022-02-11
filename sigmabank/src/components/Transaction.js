import React, { useContext } from "react";
import { AuthContext } from "../context";
 
// Takes in a JSON object representing a transaction and
// returns a table row representing the transaction.
export const Transaction = ({ transaction }) => {
  const amount = parseFloat(transaction.amount).toFixed(2);
  // Get the account id
  const auth = useContext(AuthContext);
  const bid = auth.user;
  var counterparty = transaction.toaccount;
  var amountClass = 'loss';
  var sign = '-';
  
  /**
   * Transaction times have a format of 'YYYY-MM-DDTHH:MM:SS.SSSZ', but we only
   * need the date.
   */
  const date = (transaction.transactiontime).split("T")[0];
  /**
   * Depending on whether the amount was sent or received, get the correct sign 
   * so we get e.g. -$x.xx instead of $-x.xx, and change transaction amount
   * colour according to the value.
   */
  if (transaction.toaccount == bid) {
    counterparty = transaction.fromaccount;
    amountClass = 'gain';
    sign = '+';
  }

  return (
    <tr>
      <td>{counterparty}</td>
      <td>{date}</td>
      <td className={amountClass}>{sign}${Math.abs(amount)}</td>
    </tr>
  );
};
