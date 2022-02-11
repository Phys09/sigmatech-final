import React from "react";
import { TransactionList } from "../components/TransactionList";

import '../css/TransactionHistory.css';

function TransactionHistory() {
  return (
    <div className="TransactionHistory">
      <TransactionList />
    </div>
  );
}

export default TransactionHistory;
