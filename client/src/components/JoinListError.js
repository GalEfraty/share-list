import React from "react";

const JoinListError = ({ setError, history, listId }) => {
  const onGoToList = () => {
    setError("");
    history.replace(`/`);
  };
  return (
    <div>
      Error: Unable to subscribe list || You are alreadt subscribed to this
      list,
      <button onClick={onGoToList}>Go Home</button>
    </div>
  );
};

export default JoinListError;
