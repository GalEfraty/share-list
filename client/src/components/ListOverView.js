import React from "react";
import { Link } from "react-router-dom";

const ListOverview = ({ listName, listId }) => {
  return (
    <div style={{ border: "solid black 1px" }}>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/list/${listId}`}
      >
        <div>list: {listName}</div>
      </Link>
    </div>
  );
};

export default ListOverview;
