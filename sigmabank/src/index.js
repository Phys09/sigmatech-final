import "./css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import {AuthContextProvider} from "./context";
import CreateAccountForm from "./routes/CreateAccountForm";
import LoginForm from "./routes/LoginForm";

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<CreateAccountForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/summary" element={<SummaryForm />} />
      </Routes>
    </BrowserRouter>,
  </AuthContextProvider>,
  document.getElementById("root")
);
