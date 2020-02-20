import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateList = ({ addList }) => {
  const [newListNameState, setNewListNameState] = useState("");

  const handleCreateList = e => {
    e.preventDefault();
    addList(newListNameState)
    setNewListNameState("");
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
          <button>cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateList;
