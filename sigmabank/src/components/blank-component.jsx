import React, { Component } from "react";
// import "../css/nav.css";

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
