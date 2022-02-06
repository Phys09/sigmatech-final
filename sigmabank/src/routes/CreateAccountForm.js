import React, { Component } from "react";
import { endpoint, POST_FETCH } from "../APIfunctions";

export default class CreateAccountForm extends Component {
  state = {
    email: "a",
    passwd: null,
    phonenum: null,
  };

  constructor(props) {
    super(props);

    console.log("state start", this.state);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    return (event) => {
      this.state[value] = event.target.value;
      console.log("handle change: ", value);
      console.log(this.state);
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    var payload = Object.assign(
      { body: JSON.stringify(this.state) },
      POST_FETCH
    );
    fetch(endpoint("create_account"), payload).then((resp) =>
      console.log(resp)
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="email"
          onChange={this.handleChange("email")}
        ></input>
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={this.handleChange("passwd")}
        ></input>
        <input
          type="text"
          name="phonenum"
          placeholder="phone number"
          onChange={this.handleChange("phonenum")}
        ></input>
        <input type="submit" />
      </form>
    );
  }
}
