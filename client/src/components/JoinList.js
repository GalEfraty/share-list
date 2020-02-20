import React, { useState, useContext } from "react";
import axios from "axios";
import { authContext } from "../context/auth";
import JoinListError from "./JoinListError"

const JoinList = ({ match, history }) => {
  const { currentUser } = useContext(authContext);
  const { listId, listName, inviterFullName } = match.params;
  const [errorAlreadySubscribedState, setErrorAlreadySubscribedState] = useState(false)

  const onSubscribeList = () => {
    axios
      .post("/api/subscribeUserToList", { listId })
      .then(() => {
        console.log("user subscribed to list");
        history.push("/");
      })
      .catch(error => {
        setErrorAlreadySubscribedState(true)
      });
  };

  return (
    <div>
      <h3>welcome to share-list</h3>
      <div>
        <p>
          <span>{inviterFullName + " "} </span>
          invited you subscribe the list:
          <span>{" " + listName}</span>
        </p>
      </div>
      {currentUser ? (
        <div>
          <span>{currentUser.fullName}</span>
          <button onClick={onSubscribeList}>
            click to subscribe {listName}
          </button>
          {errorAlreadySubscribedState && <JoinListError history={history} setError={setErrorAlreadySubscribedState}/>}
        </div>
      ) : (
        <div>
          please login to share-list, then come back and subasribe
          <button onClick={() => {window.location.href = "/auth/google"}}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default JoinList;
