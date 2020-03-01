import React, { useState, useEffect, useRef } from "react";
import ListOverView from "./ListOverView";
import CreateList from "./CreateList";
import axios from "axios";
import "../../styles/home.css";
import _ from "lodash";

const Home = () => {
  const [showCreateListstate, setShowCreateListstate] = useState(false);
  const [listsState, setListsState] = useState("");
  const isCancelledHome = useRef(false);

  useEffect(() => {
    fetchUserListOverView();
    return () => {
      isCancelledHome.current = true;
    };
  }, [listsState]);

  const fetchUserListOverView = () => {
    try {
      axios.get("/api/getSubscribedListsNames").then(response => {
        if (!isCancelledHome.current) {
          setListsState(response.data.lists);
        }
      });
    } catch (error) {
      console.log("error in fetchUserListOverView", error);
      window.alert("error in fetchUserListOverView");
    }
  };

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
        let tempListsState = _.cloneDeep(listsState);
        tempListsState.push(newListOverView);
        setListsState(tempListsState);
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
    <div className="container home-wrapper">
      <h1 className="home-title">Home</h1>
      <button
        className="home-create-list-btn"
        onClick={onShowCreateListClicked}
      >
        Create New List
      </button>
      {showCreateListstate && <CreateList addList={addList} />}
      <div className="home-lists-wrapper container">
        {listsState && renderListsOverView()}
      </div>
    </div>
  );
};

export default Home;
