import React, { useState, useEffect, useRef } from "react";
import ListOverView from "./ListOverView";
import CreateList from "./CreateList";
import axios from "axios";

const Home = () => {
  const [showCreateListstate, setShowCreateListstate] = useState(false);
  const [listsState, setListsState] = useState("");
  const isCancelled = useRef(false);

  useEffect(() => {
    
    const fetchUserListOverView = () => {
      try {
        axios.get("/api/getSubscribedListsNames").then(response => {
          if (!isCancelled.current) {
            setListsState(response.data.lists);
          }
        });
      } catch (error) {
        console.log("error in fetchUserListOverView", error);
        window.alert("error in fetchUserListOverView");
      }
    };
    fetchUserListOverView();
    return () => {
      isCancelled.current = true;
    };
  }, [listsState]);

  const addList = newListName => {
    axios
      .post("/api/createList", {
        newListName: newListName
      })
      .then(response => {
        const newListOverView = {
          _id: response.data._id,
          listName: response.data.listName
        };
        const tempListsState = listsState;

        tempListsState.push(newListOverView);
        console.log("temp state: ", tempListsState);
        setListsState(tempListsState);
        console.log("real state: ", listsState);
      })
      .catch(error => {
        console.log("error in handleCreateList: ", error);
        window.alert("error in handleCreateList");
      });
  };

  const renderListsOverView = () => {
    let ListOverViewComponents = [];
    for (let list of listsState) {
      ListOverViewComponents.push(
        <ListOverView
          listName={list.listName}
          listId={list._id}
          key={list._id}
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
      {showCreateListstate && <CreateList addList={addList} />}
      {listsState && renderListsOverView()}
      <a href="/api/logout">logout</a>
    </div>
  );
};

export default Home;
