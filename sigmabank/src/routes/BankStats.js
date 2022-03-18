import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../components/navbarHome";
import { StatList } from "../components/StatList";
import '../css/BankStats.css';

export default function BankStats() {
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
        <div className="BankStats">
          <StatList />
        </div>
    </React.Fragment>
  );
}
