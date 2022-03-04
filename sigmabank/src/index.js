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
import {MakeTransaction, SendMoney} from  "./routes/MakeTransaction";

import TransactionHistory from "./routes/TransactionHistory";
import EditAccountForm from "./routes/EditAccountDetail";
import AdminPanel from "./routes/AdminPanel";
import { CookiesProvider } from "react-cookie";
import ChatPage from "./routes/ChatPage";
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/chat" element={<ChatPage />} />

        <Route path="/edit" element={<EditAccountForm />} />
        <Route path="/makeTransactions" element={<MakeTransaction />}>
          <Route path="sendMoney" element={<SendMoney />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById("root")
);
