import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../css/navbar.css";
import '../css/chat.css';

class OneChat extends React.Component {

    /*
    attributes:
    - msg: text message
    - timestamp: unix time string -> converts to readable string in frontend
    - sndr: sender ("me", or "remote")

    TODO: convert timestamp to readable time

    reference with {this.props.____}
    */

    
    render() {
        {console.log(this.props.timestamp);}

    //   var dateTime = new Date(this.props.timestamp);
    //   var dateString = dateTime.toISOString(); // Returns "2013-05-31T11:54:44.000Z"

    if (this.props.sndr == "remote"){
        return (
            <li>
                <div className="message-data text-left">
                <span className="status"> {this.props.timestamp} </span>
                </div>
                <div className="message remote-message">
                {this.props.msg}
                </div>
            </li>
        );
    }

    else if (this.props.sndr == "me"){
        return (
            <li className="clearfix">
            <div className="message-data text-right">
              <span className="status">{this.props.timestamp}</span>
              <img src="chat3.png" alt="avatar" />
            </div>

            {/* "my" messages have from-me tag, which tags to the right */}
            <div className="message from-me">Chat, Chat I'm a chat</div>
          </li>
        );
    }



    }
}
export default OneChat;