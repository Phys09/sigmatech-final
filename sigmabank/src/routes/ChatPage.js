import React from "react";
import NavbarHome from "../components/navbarHome";
import ChatComponent from "../components/livechat.jsx";
import '../css/App.css';

function ChatPage() {
  return (
    <React.Fragment>
      <NavbarHome/>
        <div className="Chat">
          <ChatComponent />
        </div>
    </React.Fragment>
  );
}

export default ChatPage;
