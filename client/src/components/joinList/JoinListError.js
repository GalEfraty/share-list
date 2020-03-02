import React from "react";

const JoinListError = ({ setError, history, listId }) => {
  const onGoToList = () => {
    setError("");
    history.replace(`/`);
  };
  return (
    <div className="join-error-wrapper">
      <p className="join-error-text">
        Error: Unable to subscribe list Or You are alreadt subscribed to this
        list.
      </p>
      <button className="join-error-gohome-btn" onClick={onGoToList}>
        Go Home
      </button>
    </div>
  );
};

export default JoinListError;
