import React, { useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [searchFor, setSearchFor] = useState("");

  return (
    <nav className="navbar">
      <div className="left">
        <h1 className="heading">
          <span className="logo-span">D</span>rop <span className="logo-span">T</span>ask<span className="logo-span">.</span>
        </h1>
      </div>
      <div className="right">
        <div className="search-box">
          <input
            className="search-field"
            onChange={(event)=>setSearchFor(event.target.value)}
            value={searchFor}
           
            placeholder="Search..."
          />
          { console.log(searchFor,"hiii")}
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
