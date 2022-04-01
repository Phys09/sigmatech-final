/**
 * This file is dedicated to rendering the entire application
 */

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./css/index.css";
import AdminPanel from "./routes/AdminPanel";
import App from "./App";
import BankStats from "./routes/BankStats";
import ChatPage from "./routes/ChatPage";
import CreateAccountForm from "./routes/CreateAccountForm";
import EditAccountForm from "./routes/EditAccountDetail";
import LoanApplicationForm from "./routes/LoanApplication";
import LoginForm from "./routes/LoginForm";
import React from "react";
import ReactDOM from "react-dom";
import TransactionHistory from "./routes/TransactionHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { MakeTransaction, SendMoney } from "./routes/MakeTransaction";
import { SetupAutoPay } from "./routes/makeAutopay";
import MonthlyTransactionHistory from "./routes/MonthlyTransactionHistory";

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/loans" element={<LoanApplicationForm />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/stats" element={<BankStats />} />
        <Route path="/edit" element={<EditAccountForm />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/summary" element={<MonthlyTransactionHistory />} />
        <Route path="/makeAutopay" element={<SetupAutoPay />}/>
        <Route path="/makeTransactions" element={<MakeTransaction />}>
          <Route path="sendMoney" element={<SendMoney />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById("root")
);
