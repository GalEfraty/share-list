import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import ListSettingsAndShare from "./ListSettingsAndShare";
import ListItemsCollection from "./ListItemsCollection";
import ListError from "./ListError";

const ListView = ({ match, history }) => {
  const isCancelled = useRef(false);
  const [listState, setListState] = useState("");
  const [showSettingsState, setShowSettingsState] = useState(false);
  const [errorState, setErrorState] = useState("");
  const listId = match.params.id;

  useEffect(() => {
    const fetchList = () => {
      axios
        .get(`/api/getListById/${listId}`)
        .then(response => {
          if (!isCancelled.current) {
            setListState(response.data);
          }
        })
        .catch(() => {
          setErrorState(
            "sorry, but you are not subscribed to this list, so you can't see it's content. please ask the list's manager to send you an invitation."
          );
        });
    };
    fetchList();
    return () => {
      isCancelled.current = true;
    };
  }, [listState, listId]);

  const toggleShowShare = () => {
    showSettingsState
      ? setShowSettingsState(false)
      : setShowSettingsState(true);
  };

  return (
    <div>
      <h3>{listState.listName}</h3>
      <button onClick={toggleShowShare}>Settings and Share</button>
      {showSettingsState && (
        <ListSettingsAndShare
          toggleShowShare={toggleShowShare}
          history={history}
          list={listState}
        />
      )}
      <Link to="/">
        <button>back Home</button>
      </Link>

      {listState && (
        <ListItemsCollection
          listState={listState}
          setListState={setListState}
        />
      )}
      {errorState && <ListError error={errorState} setError={setErrorState} />}
    </div>
  );
};

export default ListView;
