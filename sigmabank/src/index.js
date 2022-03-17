/** 
 * This file is dedicated to rendering the entire application
 */

import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./css/index.css";
import AdminPanel from "./routes/AdminPanel";
import ChatPage from "./routes/ChatPage";
import CreateAccountForm from "./routes/CreateAccountForm";
import EditAccountForm from "./routes/EditAccountDetail";
import LoginForm from "./routes/LoginForm";
import {MakeTransaction, SendMoney} from  "./routes/MakeTransaction";
import TransactionHistory from "./routes/TransactionHistory";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {SetupAutoPay} from "./routes/makeAutoTransactions";

ReactDOM.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/edit" element={<EditAccountForm />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/makeAutoTransactions" element={<SetupAutoPay />}/>
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/makeTransactions" element={<MakeTransaction />}>
        <Route path="sendMoney" element={<SendMoney />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById("root")
);
