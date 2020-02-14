import React, { useState } from "react";
import axios from "axios";

const AddItem = ({ fetchList, listState }) => {
  const [itemNameState, setItemNameState] = useState("");
  const [categoryState, setCategoryState] = useState("");

  const handleAddItem = async e => {
    e.preventDefault();
    await axios
      .post("/api/additem", {
        itemName: itemNameState,
        itemCategory: categoryState,
        listId: listState._id
      })
      .then(() => {
        fetchList();
      });

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
