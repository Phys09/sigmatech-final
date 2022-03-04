import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../css/navbar.css";

class DefaultComponent extends Component {
  state = {
    version: 1,
  };

  render() {
    return (
      <div>
        <button className="btn btn-secondary btn-sm">
          SAMPLE component version {this.state.version}
        </button>
      </div>
    );
  }
}

export default DefaultComponent;
