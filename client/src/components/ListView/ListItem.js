import React, { useState } from "react";
import "../../styles/list-item-checkbox.css";

const ListItem = ({
  removeItem,
  changeCheckItem,
  itemData: { _id, itemName, category, checked }
}) => {
  const [checkedState, setCheckedState] = useState(checked);
  const handleRemoveItem = () => {
    removeItem(_id);
  };

  const handleCheckedChange = async e => {
    setCheckedState(e.target.checked);
    changeCheckItem(_id, e.target.checked);
  };

  return (
    <div className="list-item-wrapper">
      <span className="list-item-checkbox">
        <label className="list-item-checkbox-container">
          <input
            className="list-item-checkbox-input"
            type="checkbox"
            checked={!!checkedState}
            onChange={handleCheckedChange}
          />
          <span className="list-item-checkbox-checkmark"></span>
        </label>
      </span>
      <span className="list-item-name">{itemName}</span>
      {category && <span className="list-item-category">{category}</span>}

      <button className="list-item-delete" onClick={handleRemoveItem}>
        <i className="fas fa-times list-item-delete-icon"></i>
      </button>
    </div>
  );
};

export default ListItem;
