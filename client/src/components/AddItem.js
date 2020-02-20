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
    <div>
      <form onSubmit={handleAddItem}>
        <label>
          Add item
          <input
            type="text"
            name="newItemName"
            placeholder="item"
            value={itemNameState}
            onChange={onItemNameChange}
            required
          />
        </label>
        <label>
          Category
          <input
            type="text"
            name="newItemCategory"
            placeholder="category"
            value={categoryState}
            onChange={onCategoryChange}
          />
        </label>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default AddItem;
