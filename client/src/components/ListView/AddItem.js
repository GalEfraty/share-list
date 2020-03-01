import React, { useState } from "react";

const AddItem = ({ addItem }) => {
  const [itemNameState, setItemNameState] = useState("");
  const [categoryState, setCategoryState] = useState("");

  const handleAddItem = async e => {
    e.preventDefault();
    addItem(itemNameState, categoryState);

    setItemNameState("");
    setCategoryState("");
  };

  const onItemNameChange = e => {
    setItemNameState(e.target.value);
  };

  const onCategoryChange = e => {
    setCategoryState(e.target.value);
  };

  return (
    <div className="list-add-item-wrapper">
      <form onSubmit={handleAddItem}>
        <input
          className="list-add-item-inputs list-add-item-inputs-item"
          type="text"
          name="newItemName"
          placeholder="item"
          value={itemNameState}
          onChange={onItemNameChange}
          required
        />
        <input
          className="list-add-item-inputs list-add-item-inputs-category"
          type="text"
          name="newItemCategory"
          placeholder="category"
          value={categoryState}
          onChange={onCategoryChange}
        />
        <button className="list-add-item-add-btn" type="submit">
          <i className="fas fa-plus list-add-item-add-btn-icon"></i>
        </button>
      </form>
    </div>
  );
};

export default AddItem;
