import React from "react";
// import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="logoContainer">
        <a href="/">
          <img
            alt="logo"
            src="https://img.icons8.com/emoji/48/000000/soccer-ball-emoji.png"
          />
        </a>
        <div> Soccer App </div>
      </div>
      <div className="options">
        <a href="/">Jugadores</a>
        <a href="/team">Equipos</a>
      </div>
    </header>
  );
}

export default Header;
