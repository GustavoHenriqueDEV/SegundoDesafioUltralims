import React from "react";
import logoUltraLims from "../../imgs/logoUltraLims.png";
import "./appbar.css";

function AppBar({ showHistory, toggleHistory }) {
  return (
    <div className="appBar">
      <div class="nav">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <div class="menu">
          <li>
            <a href="#" onClick={toggleHistory}>
              Histórico
            </a>{" "}
          </li>
        </div>
      </div>
      <div className="imgWrapper">
        <img src={logoUltraLims} alt="erro" />
      </div>
    </div>
  );
}

export default AppBar;
