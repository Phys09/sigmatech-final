/** 
 * This file is dedicated to rendering the entire application
 */

import "./css/index.css";
import AdminPanel from "./routes/AdminPanel";
import App from "./App";
import CreateAccountForm from "./routes/CreateAccountForm";
import EditAccountForm from "./routes/EditAccountDetail";
import LoanApplicationForm from "./routes/LoanApplication";
import LoginForm from "./routes/LoginForm";
import React from "react";
import ReactDOM from "react-dom";
import TransactionHistory from "./routes/TransactionHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthContextProvider} from "./context";

ReactDOM.render (
  <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/loans" element={<LoanApplicationForm />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/edit" element={<EditAccountForm />} />
      </Routes>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
