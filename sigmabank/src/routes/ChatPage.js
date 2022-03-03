import React, { Component } from 'react';
import NavbarHome from "../components/navbarHome";
import ChatMsg from "../components/chatmsg";
import MessageCard from "../components/livechat.jsx";
import '../css/App.css';

function ChatPage() {
  return (
    <React.Fragment>
      <NavbarHome/>
        <div className="Chat">
          <ChatMsg />
        </div>
        <div>
          <MessageCard />
        </div>
    </React.Fragment>
  );
}

export default ChatPage;


