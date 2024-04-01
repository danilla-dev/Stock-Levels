import React from "react";
// Components
// Styles
import "../assets/styles/NavBar.scss";
// Contexts
// Lib
// DB
// Icons

const NavBar = () => {
  return (
    <div className="nav-bar__container">
      <div className="nav-bar-context wrapper">
        <div className="nav-bar-context__site-title">
          <h1>
            StockLevels <span>Created by DanillaDev</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
