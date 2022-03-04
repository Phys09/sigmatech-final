import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../css/chat.css';

// import '../css/chat.scss';

export default class MessageCard extends Component {
    render () {
        return (
            <div class="container">
            <div class="row clearfix">
              <div class="col-lg-12">
                <div class="card chat-app">
                  {/* LEFT SIDE */}
                  <div id="plist" class="people-list">
                    <div>List of Chats</div>
      
                    <ul class="list-unstyled chat-list mt-2 mb-0">
                      <li class="clearfix">
                        <img src="chat1.png" />
                        <div class="chat-name">
                          <div>General Inquery</div>
                          <div class="status">
                            <i class="fa fa-circle offline"></i> busy
                          </div>
                        </div>
                      </li>
                      <li class="clearfix active">
                        <img src="chat2.png" />
                        <div class="chat-name">
                          <div>Morgage Specialist</div>
                          <div class="status">
                            <i class="fa fa-circle online"></i> online
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
      
                  {/* RIGHT SIDE incl.header  */}
                  <div class="chat">
                    <div class="chat-header">
                      <div class="row">
                        <div class="col-lg-6">
                          <img src="chat2.png" alt="avatar" />
                          <div class="chat-about"><b>Mortgage Specialist</b></div>
                        </div>
                      </div>
                    </div>
      
                    {/* RIGHT SIDE */}
                    <div class="chat-session">
                      <ul>
                        {/* one msg from ME */}
                        <li class="clearfix">
                          <div class="message-data text-right">
                            <span class="status">10:10 Today</span>
                            <img src="chat3.png" alt="avatar" />
                          </div>
      
                          {/* "my" messages have from-me tag, which tags to the right */}
                          <div class="message from-me">Chat, Chat I'm a chat</div>
                        </li>
      
                        {/* One single msg from support */}
                        <li>
                          <div class="message-data">
                            <span class="status">18:33 Today</span>
                          </div>
                          <div class="message remote-message">
                            Hi Chat I'm mortgage
                          </div>
                        </li>
      
                        {/* One single msg from support */}
                        <li>
                          <div class="message-data">
                            <span class="status">18:35 Today</span>
                          </div>
                          <div class="message remote-message">
                            Selling morgages because this sentence seems to be long
                            enough.
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="chat-message">
                      <div class="input-group mb-0">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Your text here..."
                        />
                        <button id="send-chat" class="input-group-text">Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
        );
    }
};