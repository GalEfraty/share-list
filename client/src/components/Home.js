import React, { useState, useEffect } from "react";
import ListOverView from "./ListOverView";
import CreateList from "./CreateList";
import axios from "axios";

const Home = () => {
  const [showCreateListstate, setShowCreateListstate] = useState(false);
  const [listsOverViewDataState, setlistsOverViewData] = useState("");

  useEffect(() => {
    fetchUserListOverView();
  }, []);

  const fetchUserListOverView = () => {
    axios.get("/api/getuserslistsoverview").then(response => {
      setlistsOverViewData(response.data);
    });
  };

  const renderListsOverView = () => {
    let ListOverViewComponents = [];
    for (let listOverViewData of listsOverViewDataState) {
      ListOverViewComponents.push(
        <ListOverView
          listName={listOverViewData.listName}
          listId={listOverViewData.listId}
          key={listOverViewData.listId}
        />
      );
    }

    return ListOverViewComponents;
  };

  const onShowCreateListClicked = () => {
    showCreateListstate
      ? setShowCreateListstate(false)
      : setShowCreateListstate(true);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={onShowCreateListClicked}>Create New List</button>
      {showCreateListstate && (
        <CreateList fetchUserListOverView={fetchUserListOverView} />
      )}
      {listsOverViewDataState && renderListsOverView()}
      <a href="/api/logout">logout</a>
    </div>
  );
};

export default Home;
