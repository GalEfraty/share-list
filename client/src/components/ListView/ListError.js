import React from "react";
import { Link } from "react-router-dom";

const ListError = ({ error, setError }) => {
  const onGoHome = () => {
    setError("");
  };

  return (
    <div>
      <div>Error: {error}</div>
      <Link to="/">
        <button onClick={onGoHome}>Go Home</button>
      </Link>
    </div>
  );
};

export default ListError;
