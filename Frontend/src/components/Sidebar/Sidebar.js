import React, { useState } from "react";
import "../Sidebar/Sidebar.css";
import { Link } from "react-router-dom";
import "../Nav/Nav.css";

function Sidebar() {
  const [sidebarclass, setsidebarclass] = useState(false);
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className={sidebarclass ? "sidebar1 toggleSidebar " : "sidebar1 "}>
      <div id="sidebar-top">
        <div className="user">
          <i className="fa-solid fa-user-tie"></i>
          {username}
        </div>
        <div className="logout">
          <Link to="/">
            <button className="logout-btn" onClick={logout}>
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </Link>
        </div>
      </div>
      <div id="func">
        <Link
          to="/todo"
          className="function Link fs"
          onClick={() => setsidebarclass(!sidebarclass)}
        >
          Todo
        </Link>
        <Link
          to="/shared"
          className="function Link fs"
          onClick={() => setsidebarclass(!sidebarclass)}
        >
          Shared
        </Link>
        <div
          className={sidebarclass ? "hamburger-menu1 " : "hamburger-menu "}
          onClick={() => setsidebarclass(!sidebarclass)}
        >
          <div className="hamburger ">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
