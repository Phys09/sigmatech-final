import React, { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import ChatMsg from "../components/chatmsg";
import MessageUI from "../components/livechat.jsx";
import NavbarHome from "../components/navbarHome";
import '../css/App.css';

/*
Chat Page:
  ->  use MessageUI
      -> ChatMsg1
      -> ChatMsg2
      ... 
*/

export default function ChatPage() {
  const [cookies] = useCookies(["user"]);
  const aid = cookies.userId;
  var navigate = useNavigate();

  useEffect(() => {
    if (!aid) {
      alert("Please login to use this page.");
      navigate("/login");
    }
  }, [])

  return (
    <React.Fragment>
      <NavbarHome/>
        <div >
          <MessageUI />
        </div>
    </React.Fragment>
  );
}
