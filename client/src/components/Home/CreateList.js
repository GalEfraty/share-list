import React, { useState } from "react";

const CreateList = ({ addList }) => {
  const [newListNameState, setNewListNameState] = useState("");

  const handleCreateList = e => {
    e.preventDefault();
    addList(newListNameState);
    setNewListNameState("");
  };

  const onNewListNameChange = e => {
    setNewListNameState(e.target.value);
  };

  return (
    <div className="container home-create-list-wrapper">
      <form onSubmit={handleCreateList} className="home-create-list-form">
        <input
        required
          pattern=".{3,44}"
          title="at least 3 letters to 44"
          className="home-create-list-name-input"
          type="text"
          placeholder="New list name"
          value={newListNameState}
          onChange={onNewListNameChange}
        ></input>
        <button className="home-create-list-create-btn" type="submit">
          Create!
        </button>
      </form>
    </div>
  );
};

export default CreateList;
