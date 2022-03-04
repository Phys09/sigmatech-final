import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "../css/navbar.css";
import '../css/chat.css';

class OneChat extends React.Component {

    /*
    attributes:
    - msg: text message
    - timestamp: unix time string -> converts to readable string in frontend
    - sender: by me or received from remote

    TODO: convert timestamp to readable time

    reference with {this.props.____}
    */

    
    render() {
        {console.log(this.props.timestamp);}

    //   var dateTime = new Date(this.props.timestamp);
    //   var dateString = dateTime.toISOString(); // Returns "2013-05-31T11:54:44.000Z"

    return (

        //  One single msg from support 
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
}
export default OneChat;