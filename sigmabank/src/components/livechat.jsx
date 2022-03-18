import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/chat.css";
import OneChat from "./chatmsg";

// import '../css/chat.scss';

export default class MessageUI extends Component {
  render2() {
    return <OneChat msg="Hi Chat I'm mortgage" timestamp="1646361692" />;
  }
  render() {
    return (
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              {/* LEFT SIDE */}
              <div id="plist" className="people-list">
                <div>List of Chats</div>

                <ul className="list-unstyled chat-list mt-2 mb-0">
                  <li className="clearfix">
                    <img src="chat1.png" />
                    <div className="chat-name">
                      <div>General Inquery</div>
                      <div className="status">
                        <i className="fa fa-circle offline"></i> busy
                      </div>
                    </div>
                  </li>
                  <li className="clearfix active">
                    <img src="chat2.png" />
                    <div className="chat-name">
                      <div>Morgage Specialist</div>
                      <div className="status">
                        <i className="fa fa-circle online"></i> online
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* RIGHT SIDE incl.header  */}
              <div className="chat">
                <div className="chat-header">
                  <div className="row">
                    <div className="col-lg-6">
                      <img src="chat2.png" alt="avatar" />
                      <div className="chat-about">
                        <b>Mortgage Specialist</b>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="chat-session">
                  <ul>
                    {/* one msg from ME */}
                    <OneChat
                      msg="Chat, Chat I'm a chat"
                      timestamp="1646361687"
                      sndr="me"
                    />

                    {/* msg from support */}
                    <OneChat
                      msg="Hi Chat I'm mortgage"
                      timestamp="1646361692"
                      sndr="remote"
                    />
                    <OneChat
                      msg="Selling morgages because this sentence seems to be long enough."
                      timestamp="1646361692"
                      sndr="remote"
                    />
                  </ul>
                </div>
                <div className="chat-message">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your text here..."
                    />
                    <button id="send-chat" className="input-group-text">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
