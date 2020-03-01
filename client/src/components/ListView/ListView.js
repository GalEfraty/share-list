import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../styles/list.css";
import { Link } from "react-router-dom";
import ListSettingsAndShare from "../ListSettings/ListSettingsAndShare";
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
    <div className="container">
      <h3 className="list-title">{listState.listName}</h3>
      <div className="list-back-settings-btns-wrapper">
        <button
          onClick={toggleShowShare}
          className="list-back-settings-btns-btn"
        >
          Settings and Share
        </button>
        <Link to="/">
          <button className="list-back-settings-btns-btn">back Home</button>
        </Link>
      </div>

      {showSettingsState && (
        <ListSettingsAndShare
          toggleShowShare={toggleShowShare}
          history={history}
          list={listState}
        />
      )}

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
