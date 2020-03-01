import React from "react";
import { Link } from "react-router-dom";

const PublicHeader = () => {
  return (
    <nav className="header-wrapper">
        <Link className="header-link" style={{textDecoration:"none"}} to="/" >
          <i className="far fa-check-square headers_link_icon"></i><span className="header-brand" style={{textDecoration: "none"}}> Share List</span>
        </Link>
    </nav>
  );
};

export default PublicHeader;

