import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateList = ({ fetchUserListOverView }) => {
  const [newListNameState, setNewListNameState] = useState("");

  const handleCreateList = async e => {
    e.preventDefault();
    await axios.post("/api/createList", { newListNameState });
    setNewListNameState("");
    fetchUserListOverView();
  };

  const onNewListNameChange = e => {
    setNewListNameState(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleCreateList}>
        <label>
          New list name:{" "}
          <input
            type="text"
            placeholder="name"
            value={newListNameState}
            onChange={onNewListNameChange}
          ></input>
        </label>
        <br></br>
        <button type="submit">Create!</button>
        <Link to="/">
          <button>go back home</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateList;
