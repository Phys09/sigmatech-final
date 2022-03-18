import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "../components/navbarLogin";
import FooterMain from "../components/footer";
import "../css/LoanApplication.css";
import "../css/App.css";
import NavbarMain from "../components/navbar";

export default class LoanApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanType: "", // type of loan customer is applying for
      reasoning: "", // reason for requesting a loan
      amount: 0.0, // the amount they're requesting
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("Loan applications currently not yet implemented");
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="LoanPage">
        <NavbarMain />
        <form onSubmit={this.handleSubmit}>
          <label>
            Loan Type
            <select
              className="select-loan-type"
              value={this.state.value}
              onchange={this.handleChange}
            >
              <option value="business">Business Loan</option>
              <option value="mortgage">Mortgage Loan</option>
              <option value="personal">Personal Loan</option>
            </select>
            <input
              type="text"
              placeholder="Reason for application"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
