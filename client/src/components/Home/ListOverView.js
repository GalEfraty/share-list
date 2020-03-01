import React from "react";
import { Link } from "react-router-dom";

const ListOverview = ({ listName, listId }) => {
  return (
      <Link
      className="home-list-overview-wrapper"
        style={{ textDecoration: "none", color: "black" }}
        to={`/list/${listId}`}
      >
        <span>{listName}</span>
      </Link>
  );
};


export default ListOverview;
