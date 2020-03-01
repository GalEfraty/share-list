import React from "react";
import { Link } from "react-router-dom";

const PrivateHeader = () => {
  return (
    <nav className="header-wrapper header-private">
      <Link className="header-link" style={{ textDecoration: "none" }} to="/">
        <i className="far fa-check-square headers_link_icon"></i>
        <span className="header-brand" style={{ textDecoration: "none" }}> Share List</span>
      </Link>
      <button className="header-private-logout-btn" onClick={() => window.location.href="/api/logout"}>Logout</button>
    </nav>
  );
};

export default PrivateHeader;
