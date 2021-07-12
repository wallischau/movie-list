import React from "react";

const Nav = () =>
  <nav className="navbar navbar-top">
    <div className="container-fluid">
      <div>
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          Home 
        </a>
        <div className="author ">Programmed by Wallis Chau </div>
      </div>
    </div>
  </nav>;

export default Nav;