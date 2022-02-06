import "./css/index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CreateAccountForm from "./routes/CreateAccountForm";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="CreateAccountForm" element={<CreateAccountForm />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
