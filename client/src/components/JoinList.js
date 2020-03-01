import React, { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import JoinListError from "./JoinListError";
import "../styles/joinList.css";

const JoinList = ({ match, history }) => {
  const { currentUser } = useContext(authContext);
  const { listId, listName, inviterFullName } = match.params;
  const [
    errorAlreadySubscribedState,
    setErrorAlreadySubscribedState
  ] = useState(false);

  const onSubscribeList = () => {
    axios
      .post("/api/subscribeUserToList", { listId })
      .then(() => {
        console.log("user subscribed to list");
        history.push("/");
      })
      .catch(error => {
        setErrorAlreadySubscribedState(true);
      });
  };

  return (
    <div className="container join-wrapper">
      <h3>welcome to share-list</h3>
      <div className="join-main-text">
        <p>
          <span className="join-inviter-name">{inviterFullName + " "} </span>
          invited you subscribe the list:
          <span className="join-list-name">{" " + listName}</span>
        </p>
      </div>
      {currentUser ? (
        <div>
          <span className="join-invited-name">{currentUser.fullName}, </span>
          <button className="join-btn" onClick={onSubscribeList}>
            click to subscribe {listName}
          </button>
          {errorAlreadySubscribedState && (
            <JoinListError
              history={history}
              setError={setErrorAlreadySubscribedState}
            />
          )}
        </div>
      ) : (
        <div>
          please login to share-list, then come back and subasribe
          <button className="join-login-btn"
            onClick={() => {
              window.location.href = "/auth/google";
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default JoinList;
