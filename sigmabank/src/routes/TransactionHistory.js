import React from "react";
import NavbarHome from "../components/navbarHome";
import { TransactionList } from "../components/TransactionList";
import '../css/TransactionHistory.css';

function TransactionHistory() {
  return (
    <React.Fragment>
      <NavbarHome/>
        <div className="TransactionHistory">
          <TransactionList />
        </div>
    </React.Fragment>
  );
}

export default TransactionHistory;
