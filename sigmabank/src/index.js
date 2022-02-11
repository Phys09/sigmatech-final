/** 
 * This file is dedicated to rendering the entire application
 */

import "./css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import {AuthContextProvider} from "./context";
import CreateAccountForm from "./routes/CreateAccountForm";
import LoginForm from "./routes/LoginForm";

import TransactionHistory from "./routes/TransactionHistory";

import EditAccountForm from "./routes/EditAccountDetail";

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/transactions" element={<TransactionHistory />} />

        <Route path="/edit" element={<EditAccountForm />} />
      </Routes>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
