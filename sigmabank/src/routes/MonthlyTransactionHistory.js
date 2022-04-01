import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { TransactionList } from "../components/TransactionList";
import '../css/TransactionHistory.css';

export default function MonthlyTransactionHistory() {
  const [cookies] = useCookies(["user"]);
  const aid = cookies.userId;
  var navigate = useNavigate();

  useEffect(() => {
    if (!aid) {
      alert("Please login to use this page.");
      navigate("/login");
    }
  }, [])

  return (
    <React.Fragment>
      <Navbar page="Monthly Transactions"/>
        <div className="MonthlyTransactionHistory">
          <TransactionList />
        </div>
    </React.Fragment>
  );
}
