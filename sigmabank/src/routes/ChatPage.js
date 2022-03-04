import React, { Component } from 'react';
import NavbarHome from "../components/navbarHome";
// import ChatMsg from "../components/chatmsg";
import MessageUI from "../components/livechat.jsx";
import '../css/App.css';



/*
Chat Page:
  ->  use MessageUI
      -> ChatMsg1
      -> ChatMsg2
      ... 
*/

function ChatPage() {
  return (
    <React.Fragment>
      <NavbarHome/>
        <div >
          <MessageUI />
        </div>
    </React.Fragment>
  );
}

export default ChatPage;


